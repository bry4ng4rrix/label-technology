/**
 * Marque réduite de Label Technology.
 *
 * Reprend le cœur du sceau (public/logo-seal.svg) — monogramme LT et puce
 * circuit — en abandonnant l'anneau de texte, illisible en dessous de 120 px.
 * `currentColor` permet de la poser en blanc sur le dégradé de marque.
 */
export function LauraMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 90"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g fill="currentColor">
        {/* L */}
        <rect x="14" y="20" width="8" height="38" rx="1.5" />
        <rect x="14" y="50" width="22" height="8" rx="1.5" />
        {/* T */}
        <rect x="42" y="20" width="38" height="8" rx="1.5" />
        <rect x="57" y="20" width="8" height="38" rx="1.5" />
      </g>
      {/* Pads circuit — légèrement transparents pour creuser la marque */}
      <g fill="currentColor" opacity="0.55">
        <rect x="42" y="20" width="6.5" height="6.5" rx="1.5" />
        <rect x="73.5" y="20" width="6.5" height="6.5" rx="1.5" />
        <rect x="57" y="50" width="8" height="8" rx="1.5" />
      </g>
      {/* Puce */}
      <rect
        x="40"
        y="64"
        width="31"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M46.5 64v-3.5M55.5 64v-3.5M64.5 64v-3.5" />
        <path d="M46.5 80v3.5M55.5 80v3.5M64.5 80v3.5" />
      </g>
    </svg>
  );
}
