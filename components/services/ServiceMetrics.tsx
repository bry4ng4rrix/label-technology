import Reveal from "@/components/shared/Reveal";
import ServiceBackground from "@/components/services/ServiceBackground";
import type { ServiceSlug } from "@/lib/service-themes";
import { cn } from "@/lib/utils";

/**
 * Bandeau de chiffres clés, aux couleurs du service.
 * Remplace `MetricsBand` (générique) sur les pages `services/`.
 */
export default function ServiceMetrics({
  slug,
  items,
}: {
  slug: ServiceSlug;
  items: { value: string; label: string }[];
}) {
  const cols =
    items.length >= 6
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      : items.length === 5
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
        : "grid-cols-2 lg:grid-cols-4";

  return (
    <section className="relative overflow-hidden text-white">
      <ServiceBackground slug={slug} tone="dark" intensity="soft" />
      <div aria-hidden className="svc-rule absolute inset-x-0 top-0" />

      <div className="container-x py-10 sm:py-14">
        <dl className={cn("glass-card grid overflow-hidden", cols)} data-tone="dark">
          {items.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.06} className="svc-stat py-7 sm:py-8">
              <dd
                className={cn(
                  "font-display tracking-tight text-balance",
                  m.value.length > 8 ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl",
                )}
                style={{ color: "var(--svc)" }}
              >
                {m.value}
              </dd>
              <dt className="label-tag mt-2 text-white/55">{m.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
