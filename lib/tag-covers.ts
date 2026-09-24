/**
 * Visuel et accent déduits d'un tag métier.
 *
 * Utilisé par le blog, les réalisations et les offres d'emploi : aucune de ces
 * tables n'a de champ image, et plutôt qu'une migration de schéma chaque tag
 * pointe vers une illustration locale. Un tag inconnu retombe proprement sur
 * `default.jpg`.
 */
const COVERS: Record<string, string> = {
  "DÉVELOPPEMENT": "/images/blog/developpement.jpg",
  "DIGITALISATION": "/images/blog/digitalisation.jpg",
  "MARKETING": "/images/blog/marketing.jpg",
  "DONNÉES": "/images/blog/donnees.jpg",
  "STRATÉGIE": "/images/blog/strategie.jpg",
  "INFRASTRUCTURE": "/images/blog/infrastructure.jpg",
  "COMPTABILITÉ": "/images/blog/comptabilite.jpg",
};

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

export function coverFor(tag: string): string {
  return COVERS[tag?.toUpperCase()] ?? "/images/blog/default.jpg";
}

export function accentFor(tag: string): string {
  return ACCENTS[tag?.toUpperCase()] ?? "#6B8CFF";
}
