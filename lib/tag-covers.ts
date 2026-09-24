/**
 * Visuel et accent déduits d'un tag métier.
 *
 * Utilisé par le blog, les réalisations et les offres d'emploi : aucune de ces
 * tables n'a de champ image, et plutôt qu'une migration de schéma chaque tag
 * pointe vers une illustration locale.
 *
 * Deux jeux distincts, pour qu'une couverture d'article ne réapparaisse jamais
 * sur une fiche projet : `COVERS` pour le blog, `CARD_COVERS` pour les listes.
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

/**
 * Photothèque propre aux fiches projets et offres. Chaque domaine dispose de
 * plusieurs visuels : deux fiches du même domaine, affichées côte à côte, ne
 * partagent jamais la même photo.
 */
const CARD_COVERS: Record<string, string[]> = {
  "DÉVELOPPEMENT": Array.from({ length: 10 }, (_, i) => `/images/covers/developpement/${i + 1}.jpg`),
  "MARKETING": Array.from({ length: 4 }, (_, i) => `/images/covers/marketing/${i + 1}.jpg`),
  "DIGITALISATION": Array.from({ length: 4 }, (_, i) => `/images/covers/digitalisation/${i + 1}.jpg`),
  "DONNÉES": Array.from({ length: 4 }, (_, i) => `/images/covers/donnees/${i + 1}.jpg`),
  "INFRASTRUCTURE": Array.from({ length: 3 }, (_, i) => `/images/covers/infrastructure/${i + 1}.jpg`),
  "COMPTABILITÉ": Array.from({ length: 3 }, (_, i) => `/images/covers/comptabilite/${i + 1}.jpg`),
  "STRATÉGIE": Array.from({ length: 3 }, (_, i) => `/images/covers/strategie/${i + 1}.jpg`),
};

/**
 * Décalage de départ dans la photothèque, par écran. Les réalisations puisent
 * au début du jeu, les offres d'emploi après — les deux pages ne se recoupent
 * donc pas sur le domaine le plus fourni.
 */
export const CARD_OFFSET = { projets: 0, recrutement: 3 } as const;

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

/** Couverture d'article de blog — un visuel par domaine. */
export function coverFor(tag: string): string {
  return COVERS[tag?.toUpperCase()] ?? "/images/blog/default.jpg";
}

/** Visuel d'une fiche projet ou offre, `index` étant son rang dans la liste. */
export function cardCoverFor(tag: string, index = 0): string {
  const pool = CARD_COVERS[tag?.toUpperCase()] ?? CARD_COVERS["STRATÉGIE"];
  return pool[index % pool.length];
}

export function accentFor(tag: string): string {
  return ACCENTS[tag?.toUpperCase()] ?? "#6B8CFF";
}
