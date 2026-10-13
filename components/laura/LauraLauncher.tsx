"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const CLE_INVITE = "laura.invite-vue";
const DELAI_INVITE = 7_000;

/**
 * Verre sombre de la navbar, repris à l'identique : encre à 88 %, bordure
 * blanche très faible, liseré intérieur clair et ombre portée profonde. Laura
 * garde ce traitement quel que soit le thème du site — le logo est blanc et
 * cyan, il lui faut un fond sombre (sur le bleu de marque, le T tombait à
 * 1,64:1 de contraste).
 */
export const VERRE_SOMBRE =
  "border border-white/12 bg-ink/88 backdrop-blur-xl " +
  "shadow-[0_1px_0_rgb(255_255_255/0.06)_inset,0_16px_40px_-16px_rgb(0_0_0/0.55)]";

interface Props {
  ouvert: boolean;
  onToggle: () => void;
}

/**
 * Logo fixe en bas à droite.
 *
 * Trois états : au repos (logo seul), au survol (pastille « Discuter avec
 * Laura »), et l'invitation qui apparaît une fois par visiteur au bout de
 * sept secondes — assez pour ne pas sauter au visage, assez tôt pour être vue.
 */
export function LauraLauncher({ ouvert, onToggle }: Props) {
  const [invite, setInvite] = useState(false);
  const mouvementReduit = useReducedMotion();

  useEffect(() => {
    if (ouvert) return;
    if (window.localStorage.getItem(CLE_INVITE)) return;
    const t = setTimeout(() => setInvite(true), DELAI_INVITE);
    return () => clearTimeout(t);
  }, [ouvert]);

  const fermerInvite = () => {
    setInvite(false);
    window.localStorage.setItem(CLE_INVITE, "1");
  };

  const ouvrirDepuisInvite = () => {
    fermerInvite();
    onToggle();
  };

  return (
    <div className="pointer-events-none fixed right-5 bottom-5 z-[70] flex flex-col items-end gap-3">
      <AnimatePresence>
        {invite && !ouvert && (
          <motion.div
            initial={mouvementReduit ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={mouvementReduit ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              VERRE_SOMBRE,
              "pointer-events-auto relative max-w-[16rem] rounded-2xl rounded-br-md px-4 py-3 pr-9 text-white",
            )}
          >
            <button
              type="button"
              onClick={fermerInvite}
              aria-label="Masquer l'invitation"
              className="absolute top-2 right-2 rounded-md p-1 text-white/50 transition-colors hover:text-white"
            >
              <X className="size-3.5" />
            </button>
            <button type="button" onClick={ouvrirDepuisInvite} className="text-left">
              <p className="text-[13px] leading-snug font-medium">
                Bonjour, je suis Laura.
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-white/65">
                Une question sur nos services ? Je réponds tout de suite.
              </p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="group pointer-events-auto relative flex items-center">
        {/* Pastille au survol — en absolu pour ne pas décaler le bouton */}
        <span
          className={cn(
            VERRE_SOMBRE,
            "absolute right-full mr-3 hidden rounded-full px-3.5 py-2",
            "text-[13px] font-medium whitespace-nowrap text-white",
            "translate-x-1.5 opacity-0 transition-all duration-200 ease-out",
            "group-hover:translate-x-0 group-hover:opacity-100",
            "sm:block",
            ouvert && "sm:hidden",
          )}
          aria-hidden="true"
        >
          Discuter avec Laura
        </span>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={ouvert}
          aria-controls="laura-panneau"
          aria-label={ouvert ? "Fermer la discussion" : "Discuter avec Laura"}
          className={cn(
            VERRE_SOMBRE,
            "relative grid size-[58px] place-items-center rounded-full text-white",
            "transition-transform duration-200 ease-[var(--ease-spring)]",
            "hover:scale-[1.06] active:scale-95",
            "motion-reduce:transition-none motion-reduce:hover:scale-100",
          )}
        >
          {/* Halo de marque : sans lui, un rond d'encre sur une section sombre
              disparaît complètement du fond de page. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-brand-lt/25 blur-md"
          />

          <AnimatePresence mode="wait" initial={false}>
            {ouvert ? (
              <motion.span
                key="fermer"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.18 }}
                className="relative"
              >
                <X className="size-6" strokeWidth={2.4} />
              </motion.span>
            ) : (
              <motion.span
                key="marque"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="relative"
              >
                <Image
                  src="/logo-lt-mark.png"
                  alt=""
                  width={38}
                  height={22}
                  priority
                  className="w-[34px] select-none"
                />
              </motion.span>
            )}
          </AnimatePresence>

          {!ouvert && (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -bottom-0.5 grid size-[15px] place-items-center rounded-full bg-ink"
            >
              <span className="relative size-[9px] rounded-full bg-emerald-400">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" />
              </span>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
