import type { ReactNode } from "react";
import Reveal from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * En-tête de section éditorial : le titre occupe la colonne de gauche, la
 * description la colonne de droite — composition asymétrique qui crée du
 * rythme et beaucoup d'espace négatif, plutôt qu'un bloc centré.
 */
export default function SectionIntro({
  eyebrow,
  title,
  description,
  action,
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("mb-14 sm:mb-20", className)}>
      {eyebrow && (
        <p className="label-tag mb-6 flex items-center gap-3" style={{ color: "var(--svc)" }}>
          <span
            className="h-px w-8"
            style={{ background: "color-mix(in srgb, var(--svc) 70%, transparent)" }}
          />
          {eyebrow}
        </p>
      )}
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <h2
          className={cn(
            "font-display text-[clamp(1.875rem,1.3rem+2.4vw,3.5rem)] leading-[1.03] font-bold tracking-[-0.03em] text-balance",
            dark ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h2>
        <div className="lg:pt-3">
          {description && (
            <p
              className={cn(
                "max-w-lg text-[15px] leading-relaxed sm:text-base",
                dark ? "text-white/60" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          )}
          {action && <div className="mt-7">{action}</div>}
        </div>
      </div>
    </Reveal>
  );
}
