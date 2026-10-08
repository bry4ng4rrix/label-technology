"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUp,
  Check,
  Loader2,
  Mail,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import { LauraMark } from "./LauraMark";
import type { EtatLaura } from "./useLaura";
import { CODES_TERMINAUX } from "./types";

/** Amorces tirées des fiches : les 4 logiciels prêts à l'emploi et l'offre France. */
const SUGGESTIONS = [
  "Gérer une flotte de véhicules et d'engins",
  "Des développeurs dédiés depuis Madagascar",
  "Digitaliser ma gestion (ERP, Odoo)",
  "Créer un site ou une application",
];

const EMAIL_EQUIPE = "contact@labeltechnology.mg";

interface Props {
  laura: EtatLaura;
  onFermer: () => void;
}

export function LauraPanel({ laura, onFermer }: Props) {
  const {
    statut,
    messages,
    erreur,
    compteRendu,
    genereCompteRendu,
    modeDegrade,
    reclamee,
    demarree,
    envoyer,
    terminer,
    reclamer,
    reinitialiser,
  } = laura;

  const [saisie, setSaisie] = useState("");
  const zone = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLTextAreaElement>(null);
  const mouvementReduit = useReducedMotion();

  const termine = statut === "termine";
  const connecte = statut === "en-ligne";
  const enAttente = messages[messages.length - 1]?.role === "visiteur";

  // Défilement en bas à chaque nouveau fragment.
  useLayoutEffect(() => {
    const el = zone.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, erreur, compteRendu, genereCompteRendu, reclamee]);

  useEffect(() => {
    const t = setTimeout(() => champ.current?.focus(), 260);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onEchap = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFermer();
    };
    window.addEventListener("keydown", onEchap);
    return () => window.removeEventListener("keydown", onEchap);
  }, [onFermer]);

  const soumettre = useCallback(
    (texte: string) => {
      if (!texte.trim() || !connecte) return;
      envoyer(texte);
      setSaisie("");
      if (champ.current) champ.current.style.height = "auto";
    },
    [connecte, envoyer],
  );

  const ajusterHauteur = (el: HTMLTextAreaElement) => {
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  return (
    <motion.div
      id="laura-panneau"
      role="dialog"
      aria-label="Laura, assistante virtuelle de Label Technology"
      initial={
        mouvementReduit
          ? { opacity: 0 }
          : { opacity: 0, y: 16, scale: 0.96 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        mouvementReduit ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }
      }
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "bottom right" }}
      className={cn(
        "glass-strong fixed z-[65] flex flex-col overflow-hidden",
        "rounded-3xl shadow-[var(--elev-xl)]",
        // Mobile : plein écran, le logo est masqué par le widget parent
        "inset-x-3 top-3 bottom-3",
        // Desktop : colonne ancrée au-dessus du logo
        "sm:inset-auto sm:right-5 sm:bottom-[5.75rem] sm:top-auto",
        "sm:h-[min(620px,calc(100dvh-9rem))] sm:w-[400px]",
      )}
    >
      {/* Halo de marque : donne de la profondeur au verre sans alourdir */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-brand-lt/20 blur-3xl"
      />

      {/* ---------------------------------------------------------------- */}
      {/* En-tête                                                          */}
      {/* ---------------------------------------------------------------- */}
      <header className="relative flex items-center gap-3 border-b border-[var(--glass-border)] px-4 py-3.5">
        <span className="relative grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-lt to-brand-deep text-white ring-1 ring-white/25 ring-inset">
          <LauraMark className="size-[18px]" />
          <span
            className={cn(
              "absolute -right-0.5 -bottom-0.5 size-3 rounded-full ring-2 ring-[var(--glass-bg-strong)]",
              connecte
                ? "bg-emerald-500"
                : statut === "connexion"
                  ? "bg-gold"
                  : "bg-mid",
            )}
          />
        </span>

        <div className="min-w-0 flex-1">
          <p className="font-display text-[15px] leading-tight font-semibold">
            Laura
          </p>
          <p className="mt-0.5 truncate text-[11.5px] text-mid">
            {statut === "connexion" && "Connexion…"}
            {connecte && "Assistante virtuelle · répond tout de suite"}
            {termine && "Échange terminé"}
            {statut === "echec" && "Hors ligne"}
            {statut === "hors-ligne" && "Hors ligne"}
          </p>
        </div>

        {demarree && !termine && (
          <button
            type="button"
            onClick={reinitialiser}
            title="Nouvelle conversation"
            aria-label="Nouvelle conversation"
            className="rounded-lg p-2 text-mid transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            <RotateCcw className="size-4" />
          </button>
        )}
      </header>

      {modeDegrade && (
        <p className="flex items-start gap-2 border-b border-[var(--glass-border)] bg-gold/10 px-4 py-2.5 text-[12px] leading-snug text-foreground/80">
          <AlertTriangle className="mt-px size-3.5 shrink-0 text-gold" />
          Laura fonctionne en mode réduit. Laissez votre email, l'équipe vous
          répond sous 72h.
        </p>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Fil de discussion                                                */}
      {/* ---------------------------------------------------------------- */}
      <div
        ref={zone}
        aria-live="polite"
        aria-atomic="false"
        className="relative flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex",
              m.role === "visiteur" ? "justify-end" : "justify-start",
            )}
          >
            <div
              className={cn(
                "max-w-[86%] px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap",
                m.role === "visiteur"
                  ? "rounded-2xl rounded-br-md bg-gradient-to-br from-brand-lt to-brand text-white shadow-[var(--elev-sm)]"
                  : "rounded-2xl rounded-bl-md bg-white/70 ring-1 ring-[var(--glass-border)] dark:bg-white/[0.07]",
              )}
            >
              {m.contenu}
              {m.enCours && (
                <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-pulse bg-current align-middle" />
              )}
            </div>
          </div>
        ))}

        {/* Attente avant le premier fragment */}
        {enAttente && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white/70 px-4 py-3.5 ring-1 ring-[var(--glass-border)] dark:bg-white/[0.07]">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 animate-bounce rounded-full bg-mid motion-reduce:animate-none"
                  style={{ animationDelay: `${i * 140}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {erreur && (
          <div className="flex items-start gap-2 rounded-xl bg-coral/10 px-3.5 py-3 text-[12.5px] leading-snug ring-1 ring-coral/25">
            <AlertTriangle className="mt-px size-4 shrink-0 text-coral" />
            <div className="min-w-0">
              <p>{erreur.message}</p>
              {CODES_TERMINAUX.has(erreur.code) && (
                <a
                  href={`mailto:${EMAIL_EQUIPE}`}
                  className="mt-1 inline-flex items-center gap-1 font-medium text-brand hover:underline dark:text-brand-glow"
                >
                  <Mail className="size-3.5" />
                  Écrire à l'équipe
                </a>
              )}
            </div>
          </div>
        )}

        {genereCompteRendu && (
          <div className="flex items-center justify-center gap-2 py-2 text-[12.5px] text-mid">
            <Loader2 className="size-3.5 animate-spin" />
            Je prépare le résumé pour l'équipe…
          </div>
        )}

        <AnimatePresence>
          {compteRendu && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl bg-white/70 p-4 ring-1 ring-[var(--glass-border)] dark:bg-white/[0.07]"
            >
              <p className="eyebrow flex items-center gap-1.5 text-brand dark:text-brand-glow">
                <Sparkles className="size-3.5" />
                Transmis à l'équipe
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed">
                {compteRendu.resume}
              </p>
              {compteRendu.prochaine_action && (
                <p className="mt-3 border-t border-[var(--glass-border)] pt-3 text-[12.5px] text-mid">
                  <span className="font-medium text-foreground">
                    Prochaine étape —{" "}
                  </span>
                  {compteRendu.prochaine_action}
                </p>
              )}

              {reclamee ? (
                <p className="mt-3 flex items-center gap-1.5 text-[12.5px] font-medium text-emerald-600 dark:text-emerald-400">
                  <Check className="size-4" />
                  Copie envoyée par email.
                </p>
              ) : (
                <FormulaireCopie onEnvoyer={reclamer} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Suggestions — seulement avant le premier message                 */}
      {/* ---------------------------------------------------------------- */}
      {!demarree && connecte && (
        <div className="flex flex-wrap gap-1.5 px-4 pb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => soumettre(s)}
              className="rounded-full bg-white/60 px-3 py-1.5 text-[12px] ring-1 ring-[var(--glass-border)] transition-colors hover:bg-white hover:text-brand dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:hover:text-brand-glow"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ---------------------------------------------------------------- */}
      {/* Composition                                                      */}
      {/* ---------------------------------------------------------------- */}
      <div className="border-t border-[var(--glass-border)] px-3 pt-3 pb-3">
        {termine ? (
          <button
            type="button"
            onClick={reinitialiser}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand-lt to-brand px-4 py-2.5 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          >
            <RotateCcw className="size-4" />
            Nouvelle conversation
          </button>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                soumettre(saisie);
              }}
              className="flex items-end gap-2"
            >
              <label htmlFor="laura-saisie" className="sr-only">
                Votre message
              </label>
              <textarea
                id="laura-saisie"
                ref={champ}
                rows={1}
                value={saisie}
                disabled={!connecte}
                maxLength={2000}
                placeholder={
                  connecte ? "Écrire un message…" : "Connexion en cours…"
                }
                onChange={(e) => {
                  setSaisie(e.target.value);
                  ajusterHauteur(e.target);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    soumettre(saisie);
                  }
                }}
                className="max-h-[120px] min-h-[42px] flex-1 resize-none rounded-xl bg-white/65 px-3.5 py-2.5 text-[13.5px] leading-relaxed ring-1 ring-[var(--glass-border)] transition-shadow placeholder:text-mid focus:ring-2 focus:ring-brand-lt focus:outline-none disabled:opacity-60 dark:bg-white/[0.06]"
              />
              <button
                type="submit"
                disabled={!connecte || !saisie.trim()}
                aria-label="Envoyer"
                className="grid size-[42px] shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-lt to-brand text-white transition-all hover:opacity-90 disabled:opacity-35"
              >
                <ArrowUp className="size-[18px]" strokeWidth={2.5} />
              </button>
            </form>

            {demarree && (
              <button
                type="button"
                onClick={terminer}
                disabled={!connecte || genereCompteRendu}
                className="mt-2 w-full rounded-lg py-1.5 text-[12px] text-mid transition-colors hover:bg-foreground/5 hover:text-foreground disabled:opacity-50"
              >
                Terminer et transmettre à l'équipe
              </button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Récupération du nom et de l'email avec consentement explicite.
 * La case à cocher est obligatoire : sans elle, l'API refuse d'enregistrer
 * l'adresse (RG-P01).
 */
function FormulaireCopie({
  onEnvoyer,
}: {
  onEnvoyer: (nom: string, email: string, consentement: boolean) => void;
}) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [accord, setAccord] = useState(false);

  const valide = nom.trim().length > 1 && /\S+@\S+\.\S+/.test(email) && accord;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valide) onEnvoyer(nom.trim(), email.trim(), accord);
      }}
      className="mt-3 space-y-2 border-t border-[var(--glass-border)] pt-3"
    >
      <p className="text-[12.5px] font-medium">
        Recevoir une copie de cet échange
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Votre nom"
          autoComplete="name"
          aria-label="Votre nom"
          className="min-w-0 flex-1 rounded-lg bg-white/70 px-2.5 py-2 text-[12.5px] ring-1 ring-[var(--glass-border)] placeholder:text-mid focus:ring-2 focus:ring-brand-lt focus:outline-none dark:bg-white/[0.06]"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@entreprise.com"
          autoComplete="email"
          aria-label="Votre email professionnel"
          className="min-w-0 flex-[1.3] rounded-lg bg-white/70 px-2.5 py-2 text-[12.5px] ring-1 ring-[var(--glass-border)] placeholder:text-mid focus:ring-2 focus:ring-brand-lt focus:outline-none dark:bg-white/[0.06]"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-2 text-[11.5px] leading-snug text-mid">
        <input
          type="checkbox"
          checked={accord}
          onChange={(e) => setAccord(e.target.checked)}
          className="mt-[2px] size-3.5 shrink-0 accent-[var(--brand)]"
        />
        <span>
          J'accepte que Label Technology conserve mon nom et mon email pour me
          recontacter au sujet de cette demande. Désinscription possible à tout
          moment.
        </span>
      </label>

      <button
        type="submit"
        disabled={!valide}
        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-foreground/90 px-3 py-2 text-[12.5px] font-medium text-background transition-opacity hover:opacity-85 disabled:opacity-35"
      >
        <Mail className="size-3.5" />
        Envoyer la copie
      </button>
    </form>
  );
}
