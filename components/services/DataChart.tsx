"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const TYPES = [
  { name: "Saisie & collecte", value: 38, color: "#2E55D4" },
  { name: "Nettoyage & dédup.", value: 26, color: "#F5A623" },
  { name: "Analyse & dataviz", value: 22, color: "#22c55e" },
  { name: "Veille & recherche", value: 14, color: "#a78bfa" },
];

const KPIS = [
  { v: "99.5%", l: "précision garantie" },
  { v: "48h", l: "délai de livraison" },
  { v: "−80%", l: "temps de traitement" },
  { v: "RGPD", l: "conformité données" },
];

export default function DataChart() {
  return (
    <div className="p-6 rounded-sm border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
      <p className="label-tag text-[10px] mb-1" style={{ color: "var(--brand-lt)" }}>RÉPARTITION DES MISSIONS</p>
      <p className="text-white/30 text-xs mb-4">Types de traitement réalisés</p>

      <div className="grid grid-cols-2 gap-4">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={TYPES} cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={3} dataKey="value">
              {TYPES.map((_, i) => <Cell key={i} fill={TYPES[i].color} />)}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#0A0F1E", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11, borderRadius: 2 }}
              formatter={(v) => [`${v}%`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col justify-center gap-2">
          {TYPES.map((t, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: t.color }} />
              <span className="text-white/50 text-[11px]">{t.name}</span>
              <span className="ml-auto font-display text-sm" style={{ color: t.color }}>{t.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-px mt-4" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        {KPIS.map((k, i) => (
          <div key={i} className="text-center py-3 px-1" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
            <div className="font-display text-lg" style={{ color: "var(--brand-lt)" }}>{k.v}</div>
            <div className="label-tag text-[8px] text-white/25 mt-0.5">{k.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
