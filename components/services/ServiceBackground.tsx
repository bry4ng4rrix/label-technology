import { getTheme, type ServiceSlug } from "@/lib/service-themes";
import { cn } from "@/lib/utils";

/**
 * Fond immersif d'une section de service.
 *
 * Trois couches seulement, toutes en CSS pur (aucun canvas, aucune image) :
 *   1. nappes radiales teintées par le service (`.svc-mesh`)
 *   2. motif technique propre au service (`.svc-pattern`)
 *   3. deux halos flottants (`.svc-blob`), figés en `prefers-reduced-motion`
 *
 * `tone="dark"` pose aussi le fond encre ; `tone="light"` reste transparent
 * pour se poser sur la surface papier.
 */
export default function ServiceBackground({
  slug,
  tone = "dark",
  intensity = "normal",
  className,
}: {
  slug: ServiceSlug;
  tone?: "dark" | "light";
  intensity?: "soft" | "normal" | "strong";
  className?: string;
}) {
  const { pattern } = getTheme(slug);
  const meshOpacity = { soft: 0.45, normal: 0.8, strong: 1 }[intensity];
  const patternOpacity = { soft: 0.3, normal: 0.5, strong: 0.7 }[intensity];

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        tone === "dark" && "bg-ink",
        className,
      )}
    >
      {tone === "dark" && (
        <div className="absolute inset-0 bg-linear-to-b from-ink-2 to-ink" />
      )}

      <div className="svc-mesh" style={{ opacity: meshOpacity }} />
      <div className="svc-pattern" data-pattern={pattern} style={{ opacity: patternOpacity }} />

      <div
        className="svc-blob -top-24 -left-16 h-[420px] w-[420px]"
        style={{ background: "color-mix(in srgb, var(--svc) 42%, transparent)" }}
      />
      <div
        className="svc-blob -right-24 bottom-0 h-[360px] w-[360px]"
        style={{ background: "color-mix(in srgb, var(--svc-2) 34%, transparent)" }}
      />

      {/* Fondu vers le bas pour enchaîner proprement avec la section suivante */}
      {tone === "dark" && (
        <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-ink to-transparent" />
      )}
    </div>
  );
}
