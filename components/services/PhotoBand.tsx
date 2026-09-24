import PhotoPanel from "@/components/services/PhotoPanel";
import Reveal from "@/components/shared/Reveal";
import type { ServiceSlug } from "@/lib/service-themes";

/**
 * Bandeau photographique pleine largeur, avec un panneau de verre posé
 * dessus. Sert de respiration entre deux sections denses et donne un temps
 * fort éditorial — c'est la composition la plus « magazine » de la page.
 */
export default function PhotoBand({
  slug,
  image,
  eyebrow,
  title,
  children,
  stats,
}: {
  slug: ServiceSlug;
  image: { src: string; alt: string };
  eyebrow?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-20 text-white sm:py-24">
      <div aria-hidden className="svc-rule absolute inset-x-0 top-0" />
      <div className="container-x">
        <Reveal>
          <PhotoPanel
            src={image.src}
            alt={image.alt}
            ratio="16/9"
            sizes="(max-width: 1280px) 100vw, 1280px"
            tint="strong"
            className="rounded-[2.5rem]"
            overlay={
              <div className="flex h-full items-end p-6 sm:p-10 lg:p-14">
                <div className="glass-card max-w-xl p-6 sm:p-8" data-tone="dark">
                  {eyebrow && (
                    <p className="label-tag mb-3" style={{ color: "var(--svc)" }}>
                      {eyebrow}
                    </p>
                  )}
                  <p className="font-display text-[clamp(1.25rem,1rem+1.1vw,1.875rem)] leading-[1.12] font-bold tracking-[-0.025em] text-balance text-white">
                    {title}
                  </p>
                  {children && (
                    <p className="mt-4 text-[15px] leading-relaxed text-white/65">{children}</p>
                  )}
                  {stats && stats.length > 0 && (
                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/12 pt-5">
                      {stats.map((s) => (
                        <div key={s.label}>
                          <dd
                            className="font-display text-lg leading-none tracking-tight"
                            style={{ color: "var(--svc)" }}
                          >
                            {s.value}
                          </dd>
                          <dt className="mt-1 text-[11px] text-white/55">{s.label}</dt>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
