import type { ServiceSlug } from "@/lib/service-themes";

/**
 * Illustration du hero, propre à chaque service.
 *
 * 100 % SVG inline : pas de requête réseau, pas de canvas, pas de WebGL —
 * le poids est nul et le rendu reste net sur tous les écrans. Les couleurs
 * viennent de `var(--svc)` / `var(--svc-2)`, donc du thème du service.
 * Les animations sont limitées à deux ou trois éléments et coupées par
 * `prefers-reduced-motion` (règle globale dans globals.css).
 */

const A = "var(--svc)";
const A2 = "var(--svc-2)";

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="glass-card group relative w-full overflow-hidden p-5 sm:p-6" data-tone="dark">
      {/* Barre de fenêtre */}
      <div className="mb-5 flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/10" />
        <span className="ml-2 text-[11px] font-medium tracking-wide text-white/40">{label}</span>
      </div>
      {children}
    </div>
  );
}

/* --- Développement : fenêtre de code ------------------------------------- */
function DevVisual() {
  const lines = [
    { w: 62, c: A },
    { w: 88, c: "rgba(255,255,255,0.28)" },
    { w: 74, c: "rgba(255,255,255,0.20)" },
    { w: 46, c: A2 },
    { w: 80, c: "rgba(255,255,255,0.22)" },
    { w: 56, c: "rgba(255,255,255,0.16)" },
    { w: 68, c: A },
  ];
  return (
    <Frame label="app/page.tsx">
      <div className="space-y-2.5 font-mono">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-4 shrink-0 text-right text-[10px] text-white/20">{i + 1}</span>
            <span
              className="h-2 rounded-full"
              style={{ width: `${l.w}%`, background: l.c, marginLeft: i === 2 || i === 5 ? 16 : 0 }}
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <span className="size-1.5 rounded-full" style={{ background: A }} />
        <span className="text-[11px] text-white/50">Build réussi · 42 pages · 1,4 s</span>
      </div>
    </Frame>
  );
}

/* --- Marketing : courbe de croissance ------------------------------------ */
function MarketingVisual() {
  const pts = [8, 22, 18, 38, 34, 56, 72, 88];
  const d = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 300} ${100 - v}`)
    .join(" ");
  return (
    <Frame label="Acquisition · 90 jours">
      <svg viewBox="0 0 300 110" className="w-full" role="img" aria-label="Courbe de croissance du trafic">
        <defs>
          <linearGradient id="mk-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={A} stopOpacity="0.45" />
            <stop offset="100%" stopColor={A} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mk-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={A2} />
            <stop offset="100%" stopColor={A} />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        ))}
        <path d={`${d} L 300 110 L 0 110 Z`} fill="url(#mk-fill)" />
        <path d={d} fill="none" stroke="url(#mk-line)" strokeWidth="2.5" strokeLinecap="round" />
        {pts.map((v, i) => (
          <circle
            key={i}
            cx={(i / (pts.length - 1)) * 300}
            cy={100 - v}
            r={i === pts.length - 1 ? 5 : 2.5}
            fill={i === pts.length - 1 ? A : "rgba(255,255,255,0.4)"}
          />
        ))}
      </svg>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {[
          { v: "+240 %", l: "trafic" },
          { v: "3,1×", l: "conversions" },
          { v: "−38 %", l: "coût/lead" },
        ].map((m) => (
          <div key={m.l} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
            <div className="font-display text-sm" style={{ color: A }}>{m.v}</div>
            <div className="text-[10px] tracking-wide text-white/45 uppercase">{m.l}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* --- Digitalisation : flux de processus ---------------------------------- */
function DigitalVisual() {
  const steps = ["Saisie papier", "Validation", "ERP", "Reporting"];
  return (
    <Frame label="Flux automatisé">
      <ol className="space-y-3">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3">
            <span
              className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold"
              style={{
                background: `color-mix(in srgb, ${i < 2 ? A2 : A} 18%, transparent)`,
                color: i < 2 ? A2 : A,
                border: `1px solid color-mix(in srgb, ${i < 2 ? A2 : A} 30%, transparent)`,
              }}
            >
              {i + 1}
            </span>
            <span className="flex-1 text-sm text-white/70">{s}</span>
            <span
              className="h-1.5 rounded-full"
              style={{ width: `${30 + i * 18}px`, background: `color-mix(in srgb, ${A} ${25 + i * 20}%, transparent)` }}
            />
          </li>
        ))}
      </ol>
      <div className="mt-6 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
        <span className="text-[11px] text-white/50">Temps de traitement</span>
        <span className="font-display text-sm" style={{ color: A }}>−70 %</span>
      </div>
    </Frame>
  );
}

/* --- Données : table + qualité ------------------------------------------- */
function DataVisual() {
  const rows = [
    [90, 60, 40],
    [70, 85, 55],
    [55, 45, 80],
    [80, 70, 35],
  ];
  return (
    <Frame label="base_clients.csv">
      <div className="space-y-2">
        <div className="flex gap-2">
          {["id", "nom", "statut"].map((h) => (
            <span
              key={h}
              className="flex-1 rounded-md px-2 py-1 text-[10px] font-semibold tracking-wide uppercase"
              style={{ background: `color-mix(in srgb, ${A} 14%, transparent)`, color: A }}
            >
              {h}
            </span>
          ))}
        </div>
        {rows.map((r, i) => (
          <div key={i} className="flex gap-2">
            {r.map((w, j) => (
              <span key={j} className="flex-1 rounded-md border border-white/8 bg-white/4 px-2 py-2">
                <span
                  className="block h-1.5 rounded-full"
                  style={{ width: `${w}%`, background: "rgba(255,255,255,0.25)" }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-2">
        {[
          { l: "Doublons supprimés", v: "1 284" },
          { l: "Précision après contrôle", v: "99,7 %" },
        ].map((m) => (
          <div key={m.l} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-[11px] text-white/50">{m.l}</span>
            <span className="font-display text-sm" style={{ color: A }}>{m.v}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* --- Matériel IT : topologie réseau -------------------------------------- */
function MaterielVisual() {
  const nodes = [
    { x: 150, y: 26, r: 13, main: true },
    { x: 58, y: 84, r: 9 },
    { x: 150, y: 96, r: 9 },
    { x: 242, y: 84, r: 9 },
    { x: 30, y: 148, r: 7 },
    { x: 96, y: 148, r: 7 },
    { x: 204, y: 148, r: 7 },
    { x: 270, y: 148, r: 7 },
  ];
  const links: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [1, 4], [1, 5], [3, 6], [3, 7],
  ];
  return (
    <Frame label="Parc — 3 sites">
      <svg viewBox="0 0 300 175" className="w-full" role="img" aria-label="Topologie réseau du parc informatique">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke={A} strokeOpacity="0.3" strokeWidth="1.5"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            {n.main && <circle cx={n.x} cy={n.y} r={n.r + 8} fill={A} fillOpacity="0.12" />}
            <circle
              cx={n.x} cy={n.y} r={n.r}
              fill={n.main ? A : "rgba(255,255,255,0.10)"}
              stroke={n.main ? "none" : A}
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
          </g>
        ))}
      </svg>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          { v: "404", l: "équipements" },
          { v: "< 4 h", l: "intervention" },
        ].map((m) => (
          <div key={m.l} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
            <div className="font-display text-sm" style={{ color: A }}>{m.v}</div>
            <div className="text-[10px] tracking-wide text-white/45 uppercase">{m.l}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* --- Comptabilité : extrait de reporting --------------------------------- */
function ComptaVisual() {
  const rows = [
    { l: "Chiffre d'affaires", v: "+12,4 %", up: true },
    { l: "Charges d'exploitation", v: "−3,1 %", up: false },
    { l: "Trésorerie nette", v: "+8,7 %", up: true },
  ];
  const bars = [34, 52, 44, 68, 58, 78];
  return (
    <Frame label="Reporting mensuel · J+5">
      <div className="mb-5 flex h-24 items-end gap-2.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-t-md"
            style={{
              height: `${h}%`,
              background: i === bars.length - 1 ? A : `color-mix(in srgb, ${A} ${18 + i * 8}%, transparent)`,
            }}
          />
        ))}
      </div>
      <div className="space-y-2">
        {rows.map((r) => (
          <div key={r.l} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <span className="text-[11px] text-white/55">{r.l}</span>
            <span
              className="font-display text-sm"
              style={{ color: r.up ? A : "rgba(255,255,255,0.55)" }}
            >
              {r.v}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* --- Index services : les six pôles -------------------------------------- */
function IndexVisual() {
  const cells = ["Dév", "Marketing", "Digital", "Données", "Matériel", "Compta"];
  return (
    <Frame label="6 pôles · 1 équipe">
      <div className="grid grid-cols-3 gap-2.5">
        {cells.map((c, i) => (
          <div
            key={c}
            className="rounded-xl border border-white/10 px-2 py-4 text-center"
            style={{
              background: i < 2 ? `color-mix(in srgb, ${A} 16%, transparent)` : "rgba(255,255,255,0.04)",
            }}
          >
            <span
              className="mx-auto mb-2 block size-1.5 rounded-full"
              style={{ background: i < 2 ? A : "rgba(255,255,255,0.3)" }}
            />
            <span className="text-[11px] font-medium text-white/70">{c}</span>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-[11px] text-white/40">
        Deux expertises cœur, quatre pôles en appui
      </p>
    </Frame>
  );
}

const VISUALS: Record<ServiceSlug, () => React.ReactElement> = {
  dev: DevVisual,
  marketing: MarketingVisual,
  digital: DigitalVisual,
  data: DataVisual,
  materiel: MaterielVisual,
  comptabilite: ComptaVisual,
  index: IndexVisual,
};

export default function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  const V = VISUALS[slug] ?? IndexVisual;
  return <V />;
}
