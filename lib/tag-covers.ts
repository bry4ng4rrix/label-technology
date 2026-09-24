/**
 * Visuel et accent déduits d'un tag métier.
 *
 * Utilisé par le blog, les réalisations et les offres d'emploi : aucune de ces
 * tables n'a de champ image, et plutôt qu'une migration de schéma chaque tag
 * pointe vers une illustration locale. Un tag inconnu retombe proprement sur
 * `default.jpg`.
 */
const COVERS: Record<string, string[]> = {
  "DÉVELOPPEMENT": [
    "/images/blog/developpement.jpg",
    "/images/services/dev/row.jpg",
    "/images/services/dev/feature-2.jpg",
  ],
  "DIGITALISATION": [
    "/images/blog/digitalisation.jpg",
    "/images/services/digital/row2.jpg",
    "/images/services/digital/mosaic-a.jpg",
  ],
  "MARKETING": [
    "/images/blog/marketing.jpg",
    "/images/services/marketing/mosaic-a.jpg",
    "/images/services/marketing/row2.jpg",
  ],
  "DONNÉES": [
    "/images/blog/donnees.jpg",
    "/images/services/data/row2.jpg",
    "/images/services/data/feature-4.jpg",
  ],
  "STRATÉGIE": [
    "/images/blog/strategie.jpg",
    "/images/services/index/hero.jpg",
    "/images/pages/testimonials.jpg",
  ],
  "INFRASTRUCTURE": [
    "/images/blog/infrastructure.jpg",
    "/images/services/materiel/row.jpg",
    "/images/services/materiel/band.jpg",
  ],
  "COMPTABILITÉ": [
    "/images/blog/comptabilite.jpg",
    "/images/services/comptabilite/row2.jpg",
    "/images/services/comptabilite/mosaic-a.jpg",
  ],
};

const DEFAULTS = [
  "/images/blog/default.jpg",
  "/images/pages/home-band.jpg",
  "/images/pages/projets-hero.jpg",
];

/** Accent repris de l'identité des pages services, pour teinter la couverture. */
const ACCENTS: Record<string, string> = {
  "DÉVELOPPEMENT": "#4C7DFF",
  "DIGITALISATION": "#34D399",
  "MARKETING": "#F472B6",
  "DONNÉES": "#A78BFA",
  "STRATÉGIE": "#22D3EE",
  "INFRASTRUCTURE": "#22D3EE",
  "COMPTABILITÉ": "#FBBF24",
};

/**
 * `index` fait tourner les visuels d'un même tag : deux réalisations du même
 * domaine, affichées côte à côte, ne partagent donc pas la même photo.
 */
export function coverFor(tag: string, index = 0): string {
  const pool = COVERS[tag?.toUpperCase()] ?? DEFAULTS;
  return pool[index % pool.length];
}

export function accentFor(tag: string): string {
  return ACCENTS[tag?.toUpperCase()] ?? "#6B8CFF";
}
