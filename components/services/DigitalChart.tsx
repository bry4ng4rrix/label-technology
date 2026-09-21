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
    <div className="card-premium p-6 hover:translate-y-0">
      <p className="label-tag mb-1 text-brand">GAIN DE TEMPS MOYEN</p>
      <p className="mb-4 text-xs text-muted-foreground">Heures/semaine avant et après digitalisation</p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={DATA} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }} barSize={10}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "rgba(10,15,30,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} unit="h" />
          <YAxis type="category" dataKey="tache" tick={{ fill: "rgba(10,15,30,0.55)", fontSize: 11 }} width={80} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", border: "1px solid rgba(0,0,0,0.08)", fontSize: 11, borderRadius: 10 }}
            formatter={(v) => [`${v}h / semaine`, ""]}
          />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="avant" name="Avant" fill="#CBD5E1" radius={[0, 2, 2, 0]} />
          <Bar dataKey="apres" name="Après" fill="#1E3FAB" radius={[0, 2, 2, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="mt-3 text-center text-xs text-brand">
        Économie moyenne : <strong>−75% de temps opérationnel</strong>
      </p>
    </div>
  );
}
