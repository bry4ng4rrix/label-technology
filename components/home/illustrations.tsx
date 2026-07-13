/**
 * Illustrations vectorielles originales pour l'arc du Hero — remplacent des
 * photos de banque d'images par un système graphique 100% maison (pas de
 * risque de licence, coloré aux tokens de marque).
 */

function TileBackground({ color, patternId }: { color: string; patternId: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${patternId}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0F1729" />
          <stop offset="100%" stopColor="#0A0F1E" />
        </linearGradient>
        <pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.4" fill={color} opacity="0.35" />
        </pattern>
        <radialGradient id={`${patternId}-glow`} cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill={`url(#${patternId}-bg)`} />
      <rect width="400" height="600" fill={`url(#${patternId})`} />
      <rect width="400" height="600" fill={`url(#${patternId}-glow)`} />
    </>
  );
}

const svgProps = {
  viewBox: "0 0 400 600",
  preserveAspectRatio: "xMidYMid slice",
  className: "absolute inset-0 h-full w-full",
} as const;

export function DevIllustration({ color = "#3B82F6" }: { color?: string }) {
  return (
    <svg {...svgProps} role="img" aria-label="Illustration développement web">
      <TileBackground color={color} patternId="dev-dots" />
      <g transform="translate(200 260)">
        {/* Écran */}
        <rect
          x="-110"
          y="-80"
          width="220"
          height="150"
          rx="14"
          fill={color}
          fillOpacity="0.08"
          stroke={color}
          strokeWidth="3"
        />
        <rect x="-14" y="70" width="28" height="16" fill={color} fillOpacity="0.5" />
        <rect x="-46" y="86" width="92" height="8" rx="4" fill={color} fillOpacity="0.35" />
        {/* Chevrons </> */}
        <path
          d="M -30 -35 L -55 -5 L -30 25"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 30 -35 L 55 -5 L 30 25"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="6" y1="-40" x2="-6" y2="28" stroke={color} strokeWidth="5" strokeLinecap="round" />
      </g>
      {/* Lignes de code flottantes */}
      <g opacity="0.5">
        <rect x="70" y="120" width="70" height="7" rx="3.5" fill={color} />
        <rect x="70" y="140" width="46" height="7" rx="3.5" fill={color} />
        <rect x="260" y="400" width="60" height="7" rx="3.5" fill={color} />
        <rect x="260" y="420" width="38" height="7" rx="3.5" fill={color} />
      </g>
      <circle cx="90" cy="430" r="5" fill={color} opacity="0.6" />
      <circle cx="320" cy="150" r="4" fill={color} opacity="0.5" />
      <rect x="300" y="330" width="14" height="14" rx="3" fill={color} opacity="0.35" transform="rotate(20 307 337)" />
    </svg>
  );
}

export function CallCenterIllustration({ color = "#F59E0B" }: { color?: string }) {
  return (
    <svg {...svgProps} role="img" aria-label="Illustration call center bilingue">
      <TileBackground color={color} patternId="cc-dots" />
      <g transform="translate(190 250)">
        {/* Casque */}
        <path
          d="M -70 10 A 70 70 0 0 1 70 10"
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <rect x="-88" y="0" width="26" height="46" rx="10" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="4" />
        <rect x="62" y="0" width="26" height="46" rx="10" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="4" />
        {/* Micro */}
        <path d="M 75 40 Q 95 55 60 70" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <circle cx="58" cy="72" r="6" fill={color} />
        {/* Ondes sonores */}
        <path d="M 105 5 A 40 40 0 0 1 105 55" fill="none" stroke={color} strokeWidth="3" opacity="0.55" strokeLinecap="round" />
        <path d="M 122 -10 A 62 62 0 0 1 122 70" fill="none" stroke={color} strokeWidth="3" opacity="0.3" strokeLinecap="round" />
      </g>
      {/* Bulle de conversation FR/EN */}
      <g transform="translate(150 400)">
        <rect x="-70" y="-34" width="140" height="60" rx="16" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="3" />
        <path d="M -20 26 L -32 44 L -4 26 Z" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="3" strokeLinejoin="round" />
        <circle cx="-24" cy="-4" r="6" fill={color} opacity="0.8" />
        <circle cx="0" cy="-4" r="6" fill={color} opacity="0.55" />
        <circle cx="24" cy="-4" r="6" fill={color} opacity="0.3" />
      </g>
      <circle cx="60" cy="140" r="4" fill={color} opacity="0.5" />
      <circle cx="330" cy="500" r="5" fill={color} opacity="0.4" />
    </svg>
  );
}

export function ITIllustration({ color = "#06B6D4" }: { color?: string }) {
  return (
    <svg {...svgProps} role="img" aria-label="Illustration matériel informatique et infrastructure IT">
      <TileBackground color={color} patternId="it-dots" />
      <g transform="translate(140 210)">
        {/* Rack serveur */}
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${i * 46})`}>
            <rect
              x="-80"
              y="0"
              width="160"
              height="36"
              rx="8"
              fill={color}
              fillOpacity="0.08"
              stroke={color}
              strokeWidth="3"
            />
            <circle cx="-60" cy="18" r="4" fill={color} opacity="0.9" />
            <circle cx="-46" cy="18" r="4" fill={color} opacity="0.5" />
            <line x1="20" y1="10" x2="60" y2="10" stroke={color} strokeWidth="3" opacity="0.4" />
            <line x1="20" y1="18" x2="60" y2="18" stroke={color} strokeWidth="3" opacity="0.4" />
            <line x1="20" y1="26" x2="60" y2="26" stroke={color} strokeWidth="3" opacity="0.4" />
          </g>
        ))}
      </g>
      {/* Graphe réseau */}
      <g transform="translate(140 420)" stroke={color} strokeWidth="2.5" opacity="0.6">
        <line x1="0" y1="0" x2="-70" y2="60" />
        <line x1="0" y1="0" x2="70" y2="60" />
        <line x1="0" y1="0" x2="0" y2="80" />
      </g>
      <g transform="translate(140 420)" fill={color}>
        <circle cx="0" cy="0" r="9" fillOpacity="0.9" />
        <circle cx="-70" cy="60" r="7" fillOpacity="0.6" />
        <circle cx="70" cy="60" r="7" fillOpacity="0.6" />
        <circle cx="0" cy="80" r="7" fillOpacity="0.6" />
      </g>
      <circle cx="320" cy="150" r="5" fill={color} opacity="0.4" />
      <circle cx="330" cy="520" r="4" fill={color} opacity="0.5" />
    </svg>
  );
}

export function DataIllustration({ color = "#22C55E" }: { color?: string }) {
  const bars = [40, 70, 50, 95, 65];
  return (
    <svg {...svgProps} role="img" aria-label="Illustration traitement de données et statistiques">
      <TileBackground color={color} patternId="data-dots" />
      {/* Courbe de distribution */}
      <path
        d="M 60 220 Q 140 40 200 120 T 340 220"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.85"
      />
      <circle cx="140" cy="80" r="5" fill={color} opacity="0.7" />
      <circle cx="240" cy="130" r="4" fill={color} opacity="0.5" />
      <circle cx="300" cy="180" r="5" fill={color} opacity="0.6" />
      {/* Barres */}
      <g transform="translate(90 460)">
        {bars.map((h, i) => (
          <rect
            key={i}
            x={i * 46}
            y={-h}
            width="28"
            height={h}
            rx="6"
            fill={color}
            fillOpacity={0.15 + i * 0.12}
            stroke={color}
            strokeWidth="2.5"
          />
        ))}
      </g>
      <line x1="70" y1="460" x2="330" y2="460" stroke={color} strokeWidth="2" opacity="0.4" />
    </svg>
  );
}
