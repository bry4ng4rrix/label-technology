"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const DATA = [
  { cat: "PC & Laptops", v: 124 },
  { cat: "Réseau", v: 87 },
  { cat: "Écrans", v: 72 },
  { cat: "Impression", v: 58 },
  { cat: "Serveurs", v: 34 },
  { cat: "Sécurité", v: 29 },
];

const COLORS = ["#2E55D4", "#3B6AE8", "#4880FF", "#5590FF", "#6AA0FF", "#80B0FF"];

export default function MaterielChart() {
  return (
    <div className="glass-dark rounded-3xl p-6">
      <p className="label-tag mb-1 text-brand-glow">ÉQUIPEMENTS DÉPLOYÉS PAR CATÉGORIE</p>
      <p className="mb-4 text-xs text-white/55">Unités installées et maintenues (2022–2025)</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={DATA} layout="vertical" margin={{ top: 0, right: 16, left: 16, bottom: 0 }} barSize={14}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="cat" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} width={90} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0A0F1E", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11, borderRadius: 10, color: "rgba(255,255,255,0.7)" }}
            formatter={(v) => [`${v} unités`, ""]}
          />
          <Bar dataKey="v" radius={[0, 3, 3, 0]}>
            {DATA.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-3 text-center text-xs text-white/55">
        Total : <strong className="text-brand-glow">404 équipements</strong> déployés
      </p>
    </div>
  );
}
