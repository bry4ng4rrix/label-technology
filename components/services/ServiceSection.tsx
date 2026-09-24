import type { ReactNode } from "react";
import ServiceBackground from "@/components/services/ServiceBackground";
import Reveal from "@/components/shared/Reveal";
import type { ServiceSlug } from "@/lib/service-themes";
import { cn } from "@/lib/utils";

/**
 * Section de page service : ton clair (papier), encre (immersif) ou neutre.
 * En-tête optionnel aligné à gauche ou centré, avec un liseré d'accent.
 */
export default function ServiceSection({
  slug,
  tone = "light",
  eyebrow,
  title,
  description,
  align = "left",
  action,
  children,
  className,
  id,
}: {
  slug: ServiceSlug;
  tone?: "light" | "dark" | "plain";
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  return (
    <section
      id={id}
      className={cn(
        "section relative overflow-hidden",
        tone === "light" && "surface-light",
        tone === "plain" && "bg-background",
        dark && "text-white",
        className,
      )}
    >
      {dark && <ServiceBackground slug={slug} tone="dark" intensity="soft" />}

      <div className="container-x">
        {(eyebrow || title) && (
          <Reveal
            className={cn(
              "mb-12 flex flex-col gap-8 sm:mb-16",
              action && !centered && "sm:flex-row sm:items-end sm:justify-between",
              centered && "items-center text-center",
            )}
          >
            <div className={cn("max-w-2xl", centered && "mx-auto")}>
              {eyebrow && (
                <p
                  className={cn(
                    "label-tag mb-4 inline-flex items-center gap-2.5",
                    centered && "justify-center",
                  )}
                  style={{ color: dark ? "var(--svc)" : undefined }}
                >
                  <span
                    className="h-px w-6"
                    style={{ background: "color-mix(in srgb, var(--svc) 70%, transparent)" }}
                  />
                  <span className={dark ? undefined : "text-brand"}>{eyebrow}</span>
                </p>
              )}
              {title && (
                <h2 className={cn("h2-display", dark ? "text-white" : "text-foreground")}>{title}</h2>
              )}
              {description && (
                <p className={cn("lead mt-5", dark ? "text-white/60" : "text-muted-foreground")}>
                  {description}
                </p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
