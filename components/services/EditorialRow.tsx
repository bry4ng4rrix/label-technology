import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import PhotoPanel from "@/components/services/PhotoPanel";
import Reveal from "@/components/shared/Reveal";
import { cn } from "@/lib/utils";

/**
 * Rangée éditoriale : un bloc de texte face à une photographie, avec
 * inversion de l'ordre une rangée sur deux. C'est la brique qui remplace les
 * grilles de trois cartes identiques et donne son rythme à la page.
 *
 * La photo porte un panneau de verre flottant (`stat`) qui la relie à la
 * composition au lieu de rester décorative.
 */
export default function EditorialRow({
  eyebrow,
  title,
  children,
  points,
  image,
  stat,
  cta,
  reverse = false,
  tone = "light",
  ratio = "4/3",
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  points?: string[];
  image: { src: string; alt: string };
  stat?: { value: string; label: string };
  cta?: { href: string; label: string };
  reverse?: boolean;
  tone?: "light" | "dark";
  ratio?: "4/3" | "3/4" | "16/9" | "5/4";
}) {
  const dark = tone === "dark";

  return (
    <div
      className={cn(
        "grid items-center gap-10 lg:gap-16",
        /* Composition asymétrique : la photo prend un peu plus de place */
        reverse ? "lg:grid-cols-[1fr_0.85fr]" : "lg:grid-cols-[0.85fr_1fr]",
      )}
    >
      <Reveal
        delay={reverse ? 0.1 : 0}
        className={cn(reverse ? "lg:order-2" : "lg:order-1")}
      >
        {eyebrow && (
          <p className="label-tag mb-4" style={{ color: "var(--svc)" }}>
            {eyebrow}
          </p>
        )}
        <h3
          className={cn(
            "font-display text-[clamp(1.5rem,1.15rem+1.5vw,2.25rem)] leading-[1.08] font-bold tracking-[-0.025em] text-balance",
            dark ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h3>
        {children && (
          <div
            className={cn(
              "mt-5 max-w-lg text-[15px] leading-relaxed",
              dark ? "text-white/60" : "text-muted-foreground",
            )}
          >
            {children}
          </div>
        )}

        {points && points.length > 0 && (
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "color-mix(in srgb, var(--svc) 18%, transparent)" }}
                >
                  <Check className="size-3" style={{ color: "var(--svc)" }} strokeWidth={3} />
                </span>
                <span
                  className={cn("text-[15px]", dark ? "text-white/70" : "text-foreground/80")}
                >
                  {p}
                </span>
              </li>
            ))}
          </ul>
        )}

        {cta && (
          <Link
            href={cta.href}
            className="link-arrow mt-8 text-sm font-semibold"
            style={{ color: "var(--svc)" }}
          >
            {cta.label}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </Reveal>

      <Reveal
        delay={reverse ? 0 : 0.1}
        className={cn(reverse ? "lg:order-1" : "lg:order-2")}
      >
        <PhotoPanel
          src={image.src}
          alt={image.alt}
          ratio={ratio}
          tone={tone}
          sizes="(max-width: 1024px) 100vw, 55vw"
          overlay={
            stat ? (
              <div className="flex h-full items-end p-5 sm:p-7">
                {/* Panneau de verre flottant sur la photo */}
                <div className="glass-card w-fit px-5 py-4" data-tone="dark">
                  <p
                    className="font-display text-2xl leading-none tracking-tight"
                    style={{ color: "var(--svc)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium text-white/70">{stat.label}</p>
                </div>
              </div>
            ) : undefined
          }
        />
      </Reveal>
    </div>
  );
}
