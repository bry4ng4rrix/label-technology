"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Carte avec inclinaison 3D subtile au survol (souris uniquement).
 * - désactivée sur écrans tactiles et avec prefers-reduced-motion
 * - la perspective est portée par le wrapper `.tilt-root`
 * - un reflet (glare) suit le curseur, très discret
 * - avec `href`, la carte est un lien Next (utilisable depuis un Server Component)
 */
export default function TiltCard({
  children,
  className,
  rootClassName,
  maxTilt = 6,
  glare = true,
  lift = true,
  as = "div",
  href,
  style,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  rootClassName?: string;
  maxTilt?: number;
  glare?: boolean;
  lift?: boolean;
  as?: "div" | "article" | "li" | "section";
  href?: string;
  style?: CSSProperties;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const onMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (!enabled) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.style.setProperty("--ry", `${((px - 0.5) * 2 * maxTilt).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${((0.5 - py) * 2 * maxTilt).toFixed(2)}deg`);
        el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        el.style.setProperty("--glare", "1");
        el.dataset.tilting = "true";
      });
    },
    [enabled, maxTilt],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
    el.dataset.tilting = "false";
  }, []);

  const Tag = (href ? Link : as) as "div";

  return (
    <div className={cn("tilt-root h-full", rootClassName)}>
      <Tag
        ref={ref}
        {...(href ? { href } : {})}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          "tilt-card relative h-full",
          lift && enabled && "hover:-translate-y-1",
          className,
        )}
        style={style}
        {...rest}
      >
        {children}
        {glare && <span aria-hidden className="tilt-glare" />}
      </Tag>
    </div>
  );
}
