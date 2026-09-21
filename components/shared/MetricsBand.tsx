import { cn } from "@/lib/utils";
import Reveal from "@/components/shared/Reveal";

type Metric = { value: string; label: string };

/**
 * Bande de chiffres clés : verre sombre sur surface encre, séparateurs fins.
 * Remplace les anciens blocs bleu plat.
 */
export default function MetricsBand({
  items,
  className,
}: {
  items: Metric[];
  className?: string;
}) {
  const cols =
    items.length >= 6
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
      : items.length === 5
        ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
        : "grid-cols-2 lg:grid-cols-4";

  return (
    <section className={cn("surface-dark hairline-top relative", className)}>
      <div className="container-x py-10 sm:py-12">
        <div
          className={cn(
            "glass-dark grid overflow-hidden rounded-2xl",
            cols,
          )}
        >
          {items.map((m, i) => (
            <Reveal
              key={i}
              delay={i * 0.06}
              className="relative px-5 py-7 text-center sm:py-8 [&:not(:first-child)]:before:absolute [&:not(:first-child)]:before:inset-y-5 [&:not(:first-child)]:before:left-0 [&:not(:first-child)]:before:w-px [&:not(:first-child)]:before:bg-white/10"
            >
              <div className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                {m.value}
              </div>
              <div className="label-tag mt-2 text-white/45">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
