import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Photographie intégrée à l'identité du service.
 *
 * L'image n'est jamais posée « nue » : elle reçoit un voile dégradé, une
 * teinte aux couleurs du service, un anneau fin et un rayon généreux — et
 * peut porter un panneau de verre flottant (`overlay`) qui fait partie de la
 * composition plutôt que de se poser à côté.
 */
export default function PhotoPanel({
  src,
  alt,
  ratio = "4/3",
  overlay,
  priority,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  className,
  tint = "normal",
  tone = "dark",
}: {
  src: string;
  alt: string;
  ratio?: "4/3" | "3/4" | "16/9" | "1/1" | "5/4";
  overlay?: ReactNode;
  priority?: boolean;
  sizes?: string;
  className?: string;
  tint?: "soft" | "normal" | "strong";
  /** `light` : la photo est posée sur une surface papier — on assombrit peu. */
  tone?: "light" | "dark";
}) {
  const ratios = {
    "4/3": "aspect-[4/3]",
    "3/4": "aspect-[3/4]",
    "16/9": "aspect-[16/9]",
    "1/1": "aspect-square",
    "5/4": "aspect-[5/4]",
  };
  const tintOpacity = { soft: 0.18, normal: 0.32, strong: 0.5 }[tint];

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-[2rem] ring-1 ring-white/12",
        "shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)]",
        ratios[ratio],
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />

      {/* Assombrissement : dosé selon la surface d'accueil. Sur fond papier,
          un voile léger suffit et évite le contraste brutal avec la section. */}
      <div
        className={cn(
          "absolute inset-0",
          tone === "dark"
            ? "bg-linear-to-t from-ink via-ink/25 to-transparent"
            : "bg-linear-to-t from-ink/55 via-ink/5 to-transparent",
        )}
      />

      {/* Teinte aux couleurs du service — rattache la photo à l'identité */}
      <div
        className="absolute inset-0 mix-blend-color"
        style={{ background: "var(--svc)", opacity: tone === "light" ? tintOpacity * 0.55 : tintOpacity }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--svc) 30%, transparent) 0%, transparent 55%)",
        }}
      />

      {/* Reflet haut, comme sur les surfaces de verre */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"
      />

      {overlay && <figcaption className="absolute inset-0">{overlay}</figcaption>}
    </figure>
  );
}
