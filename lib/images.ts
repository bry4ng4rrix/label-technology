/**
 * Qualité d'encodage unique pour toutes les images du site.
 *
 * Auparavant chaque appel choisissait sa propre valeur (60, 65, 70, 80) et les
 * composants qui n'en passaient aucune héritaient du défaut de Next (75) : le
 * HTML de production servait quatre variantes `q=` différentes, ce qui multiplie
 * les entrées du cache de l'optimiseur pour un gain visuel nul.
 *
 * 60 en AVIF reste indiscernable de 80 sur des photos, y compris en pleine
 * largeur. Toute image du site DOIT passer par cette constante — ne jamais
 * écrire de littéral `quality={…}`.
 */
export const IMAGE_QUALITY = 60;
