/**
 * Identité visuelle par service.
 *
 * Chaque page de `app/(site)/services/` pose ces variables CSS via
 * `ServiceScope`. Tous les composants de `components/services/` s'y accrochent
 * (`var(--svc)`, `var(--svc-2)`), ce qui donne à chaque service sa propre
 * couleur et son propre motif de fond tout en gardant un seul jeu de
 * composants — donc une finition identique partout.
 */

export type ServiceSlug =
  | "dev"
  | "marketing"
  | "digital"
  | "data"
  | "materiel"
  | "comptabilite"
  | "index";

/** Motifs de fond : uniquement des gradients CSS, aucun canvas ni image. */
export type ServicePattern = "grid" | "dots" | "lines" | "rings" | "waves" | "ledger";

export type ServiceTheme = {
  /** Accent principal — reprend la couleur du service en base Supabase. */
  accent: string;
  /** Accent secondaire, pour les dégradés et le second halo. */
  accent2: string;
  pattern: ServicePattern;
};

export const SERVICE_THEMES: Record<ServiceSlug, ServiceTheme> = {
  // Développement — bleu/indigo, grille technique (architecture, code)
  dev: { accent: "#4C7DFF", accent2: "#6366F1", pattern: "grid" },
  // Marketing — rose/ambre, lignes obliques (croissance, trajectoire)
  marketing: { accent: "#F472B6", accent2: "#F59E0B", pattern: "lines" },
  // Digitalisation — émeraude/teal, ondes (flux, processus)
  digital: { accent: "#34D399", accent2: "#14B8A6", pattern: "waves" },
  // Données — violet/indigo, trame de points (volumes, enregistrements)
  data: { accent: "#A78BFA", accent2: "#6366F1", pattern: "dots" },
  // Matériel IT — cyan/bleu, anneaux (réseau, propagation)
  materiel: { accent: "#22D3EE", accent2: "#3B82F6", pattern: "rings" },
  // Comptabilité — ambre/or, registre (colonnes, lignes comptables)
  comptabilite: { accent: "#FBBF24", accent2: "#F97316", pattern: "ledger" },
  // Page d'index — couleurs de marque
  index: { accent: "#6B8CFF", accent2: "#2E55D4", pattern: "grid" },
};

export function getTheme(slug: ServiceSlug): ServiceTheme {
  return SERVICE_THEMES[slug] ?? SERVICE_THEMES.index;
}
