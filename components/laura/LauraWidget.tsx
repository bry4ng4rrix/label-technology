"use client";

import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { LauraLauncher } from "./LauraLauncher";
import { LauraPanel } from "./LauraPanel";
import { useLaura } from "./useLaura";

/** Chemins où Laura ne doit pas apparaître. */
const EXCLUS = ["/setting", "/mentions-legales"];

export function LauraWidget() {
  const [ouvert, setOuvert] = useState(false);
  // `amorce` reste vrai après la première ouverture : le socket survit à la
  // fermeture du panneau, l'échange n'est pas perdu si le visiteur le replie.
  const [amorce, setAmorce] = useState(false);
  const chemin = usePathname();

  const laura = useLaura(amorce);

  if (EXCLUS.some((p) => chemin?.startsWith(p))) return null;

  const basculer = () => {
    setOuvert((v) => {
      if (!v) setAmorce(true);
      return !v;
    });
  };

  return (
    <>
      {/* Sur mobile le panneau occupe tout l'écran : le logo passe dessous. */}
      <div className={ouvert ? "max-sm:hidden" : undefined}>
        <LauraLauncher ouvert={ouvert} onToggle={basculer} />
      </div>

      <AnimatePresence>
        {ouvert && <LauraPanel laura={laura} onFermer={() => setOuvert(false)} />}
      </AnimatePresence>

      {/* Fermeture mobile : le panneau est plein écran, il lui faut sa croix */}
      {ouvert && (
        <button
          type="button"
          onClick={basculer}
          aria-label="Fermer la discussion"
          className="fixed top-5 right-5 z-[80] grid size-9 place-items-center rounded-full bg-foreground/80 text-background backdrop-blur-sm sm:hidden"
        >
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </>
  );
}
