import Reveal from "@/components/shared/Reveal";
import ServiceBackground from "@/components/services/ServiceBackground";
import type { ServiceSlug } from "@/lib/service-themes";
import { cn } from "@/lib/utils";

/**
 * Chiffres en très grande typographie, posés directement sur la surface —
 * pas de carte. C'est un temps de respiration éditorial entre deux sections
 * denses.
 */
export default function BigStats({
  slug,
  items,
  caption,
}: {
  slug: ServiceSlug;
  items: { value: string; label: string }[];
  caption?: string;
}) {
  return (
    <section className="relative overflow-hidden py-20 text-white sm:py-24">
      <ServiceBackground slug={slug} tone="dark" intensity="soft" />
      <div aria-hidden className="svc-rule absolute inset-x-0 top-0" />

      <div className="container-x">
        <div
          className={cn(
            "grid gap-x-8 gap-y-12",
            items.length >= 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3",
          )}
        >
          {items.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <p
                className={cn(
                  "font-display leading-none font-bold tracking-[-0.04em] text-balance",
                  m.value.length > 8
                    ? "text-[clamp(1.5rem,1.1rem+1.2vw,2.25rem)]"
                    : "text-[clamp(2.5rem,1.6rem+3vw,4.5rem)]",
                )}
                style={{ color: "var(--svc)" }}
              >
                {m.value}
              </p>
              <p className="mt-3 max-w-[16ch] text-[13px] leading-snug text-white/55">
                {m.label}
              </p>
            </Reveal>
          ))}
        </div>

        {caption && (
          <Reveal delay={0.3}>
            <p className="mt-14 max-w-2xl border-t border-white/10 pt-8 text-[15px] leading-relaxed text-white/55">
              {caption}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
