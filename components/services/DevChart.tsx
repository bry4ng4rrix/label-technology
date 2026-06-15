"use client";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

const DATA = [
  { skill: "React / Next.js", score: 97 },
  { skill: "Node.js / API", score: 94 },
  { skill: "Mobile (RN)", score: 88 },
  { skill: "Base de données", score: 92 },
  { skill: "DevOps / Cloud", score: 85 },
  { skill: "Sécurité", score: 80 },
];

export default function DevChart() {
  return (
    <div className="p-6 rounded-sm border" style={{ backgroundColor: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}>
      <p className="label-tag text-[10px] mb-1" style={{ color: "var(--brand-lt)" }}>MAÎTRISE TECHNIQUE</p>
      <p className="text-white/30 text-xs mb-4">Score d'expertise par domaine</p>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={DATA} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }} />
          <Radar dataKey="score" stroke="#2E55D4" fill="#2E55D4" fillOpacity={0.25} strokeWidth={2} dot={{ fill: "#2E55D4", r: 3 }} />
          <Tooltip
            contentStyle={{ backgroundColor: "#0A0F1E", border: "1px solid rgba(255,255,255,0.08)", fontSize: 11, borderRadius: 2 }}
            formatter={(v) => [`${v}/100`, ""]}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
