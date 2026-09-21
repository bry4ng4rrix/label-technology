"use client";

import { cn } from "@/lib/utils";

export type ChipMeta = { color: string; bg: string };

/**
 * Filtres "pill" avec compteur. Couleur d'accent par tag optionnelle.
 */
export default function FilterChips({
  tags,
  active,
  onChange,
  counts,
  meta,
  allLabel = "TOUS",
  className,
}: {
  tags: string[];
  active: string;
  onChange: (tag: string) => void;
  counts: Record<string, number>;
  meta?: Record<string, ChipMeta>;
  allLabel?: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filtrer"
      className={cn("flex flex-wrap gap-2", className)}
    >
      {tags.map((tag) => {
        const isActive = active === tag;
        const m = meta?.[tag];
        const accent = m?.color ?? "var(--brand)";
        return (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tag)}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-[11px] font-semibold tracking-[0.12em] uppercase transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none",
              isActive
                ? "-translate-y-px border-transparent text-white shadow-md"
                : "border-border bg-card/70 text-muted-foreground backdrop-blur-sm hover:border-foreground/25 hover:text-foreground",
            )}
            style={isActive ? { backgroundColor: accent } : undefined}
          >
            {tag === "TOUS" ? allLabel : tag}
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                isActive ? "bg-white/25 text-white" : "bg-muted text-muted-foreground",
              )}
            >
              {counts[tag] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
