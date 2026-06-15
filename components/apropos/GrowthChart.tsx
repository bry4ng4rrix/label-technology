"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DATA = [
  { an: "2022", collab: 10,  projets: 3,  postes: 0  },
  { an: "2023", collab: 28,  projets: 14, postes: 20 },
  { an: "2024", collab: 48,  projets: 31, postes: 50 },
  { an: "2025", collab: 58,  projets: 47, postes: 50 },
  { an: "2026", collab: 63,  projets: 60, postes: 50 },
];

export default function GrowthChart() {
  return (
    <div className="p-6 rounded-sm border" style={{ backgroundColor: "var(--white)", borderColor: "rgba(0,0,0,0.08)" }}>
      <p className="label-tag text-[10px] mb-1" style={{ color: "var(--brand)" }}>CROISSANCE</p>
      <h3 className="font-display text-xl mb-6" style={{ color: "var(--ink)" }}>
        4 ans de développement
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={DATA} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="grad-collab" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#1E3FAB" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1E3FAB" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-projets" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#F5A623" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#F5A623" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-postes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
          <XAxis
            dataKey="an"
            tick={{ fill: "rgba(10,15,30,0.5)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "rgba(10,15,30,0.3)", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: "2px",
              fontSize: "12px",
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
          />
          <Area type="monotone" dataKey="collab"  name="Collaborateurs" stroke="#1E3FAB" strokeWidth={2} fill="url(#grad-collab)"  dot={{ fill: "#1E3FAB", r: 3 }} />
          <Area type="monotone" dataKey="projets" name="Projets livrés"  stroke="#F5A623" strokeWidth={2} fill="url(#grad-projets)" dot={{ fill: "#F5A623", r: 3 }} />
          <Area type="monotone" dataKey="postes"  name="Postes call ctr" stroke="#22c55e" strokeWidth={2} fill="url(#grad-postes)"  dot={{ fill: "#22c55e", r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
