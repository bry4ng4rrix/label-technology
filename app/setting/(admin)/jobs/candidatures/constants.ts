export const APPLICATION_STATUSES = [
  "nouveau",
  "contacté",
  "entretien",
  "accepté",
  "refusé",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const STATUS_LABELS: Record<string, string> = {
  nouveau: "Nouveau",
  "contacté": "Contacté",
  entretien: "Entretien",
  "accepté": "Accepté",
  "refusé": "Refusé",
};

/** Classes du point de couleur + badge par statut. */
export const STATUS_STYLES: Record<string, { dot: string; badge: string }> = {
  nouveau: {
    dot: "bg-blue-500",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  "contacté": {
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  entretien: {
    dot: "bg-violet-500",
    badge: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  "accepté": {
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  "refusé": {
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
};
