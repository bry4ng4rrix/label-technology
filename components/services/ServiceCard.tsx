import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Carte de verre premium réutilisée sur toutes les pages services.
 * Le halo d'accent, le liseré lumineux et l'élévation au survol viennent de
 * `.glass-card` (globals.css) et suivent la couleur du service.
 */
export default function ServiceCard({
  icon,
  eyebrow,
  title,
  children,
  footer,
  href,
  tone = "light",
  className,
  style,
}: {
  icon?: ReactNode;
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  href?: string;
  tone?: "light" | "dark";
  className?: string;
  style?: React.CSSProperties;
}) {
  const inner = (
    <>
      {icon && (
        <span className={cn("svc-icon mb-5", "size-12 [&_svg]:size-5.5")} aria-hidden>
          {icon}
        </span>
      )}
      {eyebrow && (
        <p className="label-tag mb-2" style={{ color: "var(--svc)" }}>
          {eyebrow}
        </p>
      )}
      <h3
        className={cn(
          "h3-display",
          tone === "dark" ? "text-white" : "text-foreground",
        )}
      >
        {title}
      </h3>
      {children && (
        <div
          className={cn(
            "mt-3 flex-1 text-[15px] leading-relaxed",
            tone === "dark" ? "text-white/60" : "text-muted-foreground",
          )}
        >
          {children}
        </div>
      )}
      {footer}
      {href && (
        <span
          className="link-arrow mt-6 text-sm font-semibold"
          style={{ color: "var(--svc)" }}
        >
          En savoir plus
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      )}
    </>
  );

  const classes = cn("glass-card group flex h-full flex-col p-7 sm:p-8", className);

  if (href) {
    return (
      <Link href={href} className={classes} data-tone={tone} style={style}>
        {inner}
      </Link>
    );
  }
  return (
    <div className={classes} data-tone={tone} style={style}>
      {inner}
    </div>
  );
}
