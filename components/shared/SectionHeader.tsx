import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";

type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  /** "dark" sur les surfaces encre, "light" sur papier. */
  tone?: "light" | "dark";
  /** Niveau sémantique du titre. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * En-tête de section : eyebrow → titre → description, avec action optionnelle
 * alignée à droite. Une seule hiérarchie pour toutes les pages.
 */
export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  tone = "light",
  as: Tag = "h2",
  className,
}: SectionHeaderProps) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-8 sm:mb-16",
        action && !centered && "sm:flex-row sm:items-end sm:justify-between",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <p
            className={cn(
              "label-tag mb-4 inline-flex items-center gap-2.5",
              dark ? "text-brand-glow" : "text-brand",
              centered && "justify-center",
            )}
          >
            <span className={cn("h-px w-6", dark ? "bg-brand-glow/70" : "bg-brand/60")} />
            {eyebrow}
          </p>
        )}
        <Tag className={cn("h2-display", dark ? "text-white" : "text-foreground")}>
          {title}
        </Tag>
        {description && (
          <p className={cn("lead mt-5", dark ? "text-white/60" : "text-muted-foreground")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
