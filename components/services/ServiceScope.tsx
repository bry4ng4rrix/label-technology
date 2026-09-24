import type { CSSProperties, ReactNode } from "react";
import { getTheme, type ServiceSlug } from "@/lib/service-themes";
import { cn } from "@/lib/utils";

/**
 * Pose les variables CSS d'identité du service (`--svc`, `--svc-2`) sur tout
 * le sous-arbre. Tous les composants `components/services/*` s'y accrochent.
 */
export default function ServiceScope({
  slug,
  children,
  className,
  as: Tag = "div",
}: {
  slug: ServiceSlug;
  children: ReactNode;
  className?: string;
  as?: "div" | "main" | "section";
}) {
  const t = getTheme(slug);
  return (
    <Tag
      className={cn("svc-scope", className)}
      style={{ ["--svc" as string]: t.accent, ["--svc-2" as string]: t.accent2 }}
    >
      {children}
    </Tag>
  );
}

/** Style inline équivalent, quand un wrapper supplémentaire n'est pas souhaitable. */
export function scopeStyle(slug: ServiceSlug): CSSProperties {
  const t = getTheme(slug);
  return { ["--svc" as string]: t.accent, ["--svc-2" as string]: t.accent2 } as CSSProperties;
}
