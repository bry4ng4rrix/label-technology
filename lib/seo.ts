/**
 * Image de partage (Open Graph / Twitter).
 *
 * Elle est générée à la volée par `app/opengraph-image.tsx`. Next n'injecte
 * automatiquement cette image que sur les pages qui ne déclarent pas leur
 * propre bloc `openGraph` — dès qu'une page en déclare un, il remplace
 * entièrement celui du layout parent, images comprises. On réutilise donc
 * cette constante dans chaque page pour garder un aperçu partout.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Label Technology — Partenaire Technologique Premium",
} as const;
