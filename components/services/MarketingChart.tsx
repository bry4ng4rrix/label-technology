"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const RESULTS = [
  { canal: "SEO", label: "+180%", value: 180, unit: "trafic organique" },
  { canal: "Google Ads", label: "−60%", value: 60, unit: "coût d'acquisition" },
  { canal: "Social Media", label: "×3", value: 75, unit: "engagement" },
  { canal: "Email", label: "94%", value: 94, unit: "délivrabilité" },
];

const COLORS = ["#2E55D4", "#F5A623", "#22c55e", "#a78bfa"];

export default function MarketingChart() {
  return (
    <div className="p-6 rounded-sm" style={{ backgroundColor: "var(--ink)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="label-tag text-[10px] mb-1" style={{ color: "var(--brand-lt)" }}>RÉSULTATS CLIENTS MOYENS</p>
      <p className="text-white/30 text-xs mb-4">Amélioration constatée après 6 mois</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {RESULTS.map((r, i) => (
          <div key={i} className="p-4 rounded-sm" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
            <div className="font-display text-2xl mb-0.5" style={{ color: COLORS[i] }}>{r.label}</div>
            <div className="label-tag text-[9px] text-white/30">{r.canal}</div>
            <div className="text-white/20 text-[10px] mt-0.5">{r.unit}</div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={RESULTS} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={28}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
          <XAxis dataKey="canal" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Tooltip
            contentStyle={{ backgroundColor: "#0A0F1E", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11, borderRadius: 2 }}
            formatter={(v, name, { payload }) => [payload.label, payload.unit]}
          />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {RESULTS.map((_, i) => <Cell key={i} fill={COLORS[i]} opacity={0.8} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
