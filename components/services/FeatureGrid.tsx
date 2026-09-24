import type { ReactNode } from "react";
import Reveal from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

export type Feature = { icon?: ReactNode; title: string; desc: string };

/**
 * Liste d'expertises en composition éditoriale : pas de cartes encadrées, mais
 * des colonnes séparées par des filets fins — plus proche d'une mise en page
 * de magazine que d'une grille de cartes SaaS.
 */
export default function FeatureGrid({
  items,
  tone = "light",
  columns = 3,
}: {
  items: Feature[];
  tone?: "light" | "dark";
  columns?: 2 | 3;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "grid gap-x-10 gap-y-12",
        columns === 3 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2",
      )}
    >
      {items.map((f, i) => (
        <Reveal key={f.title} delay={(i % 3) * 0.08} className="group h-full">
          <div
            className={cn(
              "flex h-full flex-col border-t pt-7 transition-colors duration-300",
              dark ? "border-white/12 group-hover:border-white/30" : "border-border",
            )}
            style={{ borderTopWidth: 1 }}
          >
            {f.icon && (
              <span className="svc-icon mb-6 size-12 text-2xl [&_svg]:size-5.5" aria-hidden>
                {f.icon}
              </span>
            )}
            <h3
              className={cn(
                "font-display text-lg leading-snug font-semibold tracking-tight sm:text-xl",
                dark ? "text-white" : "text-foreground",
              )}
            >
              {f.title}
            </h3>
            <p
              className={cn(
                "mt-3 text-[15px] leading-relaxed",
                dark ? "text-white/60" : "text-muted-foreground",
              )}
            >
              {f.desc}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
