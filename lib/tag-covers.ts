/**
 * Couverture d'article, déduite de son tag.
 *
 * La table `blog_posts` n'a pas de champ image : plutôt qu'une migration de
 * schéma, chaque tag pointe vers une illustration locale. Ajouter un tag sans
 * couverture retombe proprement sur `default.jpg`.
 */
const COVERS: Record<string, string> = {
  "DÉVELOPPEMENT": "/images/blog/developpement.jpg",
  "DIGITALISATION": "/images/blog/digitalisation.jpg",
  "MARKETING": "/images/blog/marketing.jpg",
  "DONNÉES": "/images/blog/donnees.jpg",
  "STRATÉGIE": "/images/blog/strategie.jpg",
};

/** Accent repris de l'identité des pages services, pour teinter la couverture. */
const ACCENTS: Record<string, string> = {
  "DÉVELOPPEMENT": "#4C7DFF",
  "DIGITALISATION": "#34D399",
  "MARKETING": "#F472B6",
  "DONNÉES": "#A78BFA",
  "STRATÉGIE": "#22D3EE",
};

export function coverFor(tag: string): string {
  return COVERS[tag?.toUpperCase()] ?? "/images/blog/default.jpg";
}

export function accentFor(tag: string): string {
  return ACCENTS[tag?.toUpperCase()] ?? "#6B8CFF";
}
