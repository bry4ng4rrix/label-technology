"""Grille de score — RG-Q03 et RG-Q04.

Le score est calculé par du code, pas par le modèle. Sinon la même conversation
noterait 55 un jour et 75 le lendemain, et les alertes « prospect chaud »
deviendraient du bruit.

Grille PROPOSÉE, à valider par l'équipe puis à ajuster après une trentaine de
conversations réelles (cf. docs/regles-de-gestion.md § 3, point 2).
"""

from dataclasses import dataclass

from app.config import params
from app.enums import Temperature
from app.schemas import ProspectData, QualificationData


@dataclass(frozen=True, slots=True)
class Critere:
    cle: str
    libelle: str
    points: int


GRILLE: tuple[Critere, ...] = (
    Critere("identite", "Identité complète (nom, entreprise, contact)", 20),
    Critere("besoin", "Besoin rattaché à une offre", 20),
    Critere("budget", "Budget évoqué", 15),
    Critere("delai", "Délai inférieur à 3 mois", 15),
    Critere("decideur", "Interlocuteur décideur", 10),
    Critere("volume", "Volume renseigné", 10),
    Critere("demande", "Démo, devis ou appel demandé", 10),
)

TOTAL = sum(c.points for c in GRILLE)
assert TOTAL == 100, "La grille doit totaliser 100 points"


def _criteres_remplis(p: ProspectData, q: QualificationData) -> dict[str, bool]:
    return {
        "identite": bool(p.nom and p.entreprise and (p.email or p.telephone)),
        "besoin": bool(q.service_concerne and q.besoins),
        "budget": q.budget_evoque,
        "delai": 0 < q.delai_mois_estime <= 3,
        "decideur": q.interlocuteur_decideur,
        "volume": q.volume_renseigne,
        "demande": q.demande_explicite,
    }


def calculer(
    prospect: ProspectData, qualification: QualificationData
) -> tuple[int, Temperature, str]:
    """Retourne (score sur 100, température, justification lisible)."""
    remplis = _criteres_remplis(prospect, qualification)
    score = sum(c.points for c in GRILLE if remplis[c.cle])

    if score >= params.SEUIL_SCORE_CHAUD:
        temperature = Temperature.CHAUD
    elif score >= params.SEUIL_SCORE_TIEDE:
        temperature = Temperature.TIEDE
    else:
        temperature = Temperature.FROID

    acquis = [c.libelle for c in GRILLE if remplis[c.cle]]
    manquants = [c.libelle for c in GRILLE if not remplis[c.cle]]
    justification = f"{score}/100. Acquis : " + (
        ", ".join(acquis) if acquis else "aucun critère"
    )
    if manquants:
        justification += ". Manquant : " + ", ".join(manquants)
    return score, temperature, justification + "."
