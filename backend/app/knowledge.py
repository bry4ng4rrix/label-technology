"""Chargement des fiches avec rechargement à chaud.

RG-F01 : seule source de vérité de Laura.
RG-F02 : modifiable par l'équipe sans redéploiement — on relit dès qu'un
fichier change de date de modification.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from app.config import params

_ENTETE = re.compile(r"^---\s*\n(.*?)\n---\s*\n", re.DOTALL)


@dataclass(frozen=True, slots=True)
class Fiche:
    code: str
    titre: str
    contenu: str
    a_completer: bool
    chemin: Path


class DepotFiches:
    def __init__(self, dossier: Path | None = None) -> None:
        self._dossier = dossier or params.dossier_fiches
        self._cache: dict[str, Fiche] = {}
        self._empreinte: tuple[tuple[str, float], ...] = ()

    def _empreinte_disque(self) -> tuple[tuple[str, float], ...]:
        return tuple(
            (f.name, f.stat().st_mtime) for f in sorted(self._dossier.glob("*.md"))
        )

    def _recharger_si_besoin(self) -> None:
        empreinte = self._empreinte_disque()
        if empreinte == self._empreinte and self._cache:
            return
        cache: dict[str, Fiche] = {}
        for chemin in sorted(self._dossier.glob("*.md")):
            fiche = self._lire(chemin)
            cache[fiche.code] = fiche
        self._cache = cache
        self._empreinte = empreinte

    @staticmethod
    def _lire(chemin: Path) -> Fiche:
        brut = chemin.read_text(encoding="utf-8")
        meta: dict[str, str] = {}
        corps = brut
        if m := _ENTETE.match(brut):
            for ligne in m.group(1).splitlines():
                if ":" in ligne:
                    cle, _, val = ligne.partition(":")
                    meta[cle.strip()] = val.strip().strip('"')
            corps = brut[m.end() :]
        return Fiche(
            code=meta.get("code", chemin.stem.split("-")[0]),
            titre=meta.get("titre", chemin.stem),
            contenu=corps.strip(),
            a_completer=meta.get("a_completer", "false").lower() == "true",
            chemin=chemin,
        )

    def toutes(self) -> list[Fiche]:
        self._recharger_si_besoin()
        return sorted(self._cache.values(), key=lambda f: f.code)

    def obtenir(self, code: str) -> Fiche | None:
        self._recharger_si_besoin()
        return self._cache.get(code)

    def ecrire(self, code: str, titre: str, contenu: str, a_completer: bool) -> Fiche:
        """Édition par l'équipe (RG-F02). Invalide le cache."""
        existante = self.obtenir(code)
        if existante is None:
            raise KeyError(code)
        entete = (
            f'---\ncode: "{code}"\ntitre: {titre}\n'
            f"a_completer: {str(a_completer).lower()}\n---\n"
        )
        existante.chemin.write_text(entete + contenu.strip() + "\n", encoding="utf-8")
        self._empreinte = ()  # force la relecture
        return self.obtenir(code)  # type: ignore[return-value]

    def bloc_prompt(self) -> str:
        """Les 15 fiches concaténées pour le prompt système.

        ~3 000 tokens au total : tout tient dans le contexte, donc pas de RAG
        (cf. docs/regles-de-gestion.md, RG-F01).
        """
        parties = []
        for f in self.toutes():
            marque = "  [FICHE INCOMPLÈTE — RENVOYER À L'ÉQUIPE]" if f.a_completer else ""
            parties.append(f"### Fiche {f.code} — {f.titre}{marque}\n{f.contenu}")
        return "\n\n".join(parties)

    def codes_a_completer(self) -> list[str]:
        return [f.code for f in self.toutes() if f.a_completer]


fiches = DepotFiches()
