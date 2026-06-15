"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const DATA = [
  { tache: "Comptabilité", avant: 14, apres: 2 },
  { tache: "Paie / RH",   avant: 10, apres: 1 },
  { tache: "Stocks",       avant: 8,  apres: 1 },
  { tache: "Reporting",    avant: 6,  apres: 0.5 },
  { tache: "Commandes",    avant: 5,  apres: 0.5 },
];

export default function DigitalChart() {
  return (
    <div className="p-6 rounded-sm" style={{ backgroundColor: "var(--white)", border: "1px solid rgba(0,0,0,0.08)" }}>
      <p className="label-tag text-[10px] mb-1" style={{ color: "var(--brand)" }}>GAIN DE TEMPS MOYEN</p>
      <p className="text-xs mb-4" style={{ color: "var(--mid)" }}>Heures/semaine avant et après digitalisation</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={DATA} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }} barSize={10}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "rgba(10,15,30,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} unit="h" />
          <YAxis type="category" dataKey="tache" tick={{ fill: "rgba(10,15,30,0.55)", fontSize: 11 }} width={80} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.08)", fontSize: 11, borderRadius: 2 }}
            formatter={(v) => [`${v}h / semaine`, ""]}
          />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="avant" name="Avant" fill="#CBD5E1" radius={[0, 2, 2, 0]} />
          <Bar dataKey="apres" name="Après" fill="#1E3FAB" radius={[0, 2, 2, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-center text-xs mt-3" style={{ color: "var(--brand)" }}>
        Économie moyenne : <strong>−75% de temps opérationnel</strong>
      </p>
    </div>
  );
}
