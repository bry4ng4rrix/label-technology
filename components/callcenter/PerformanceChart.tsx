"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const WEEKLY = [
  { jour: "Lun", appels: 312, satisf: 94 },
  { jour: "Mar", appels: 428, satisf: 96 },
  { jour: "Mer", appels: 387, satisf: 92 },
  { jour: "Jeu", appels: 461, satisf: 97 },
  { jour: "Ven", appels: 503, satisf: 95 },
  { jour: "Sam", appels: 278, satisf: 98 },
  { jour: "Dim", appels: 194, satisf: 99 },
];

const HORAIRE = [
  { h: "8h",  v: 24 }, { h: "9h",  v: 68 }, { h: "10h", v: 87 },
  { h: "11h", v: 92 }, { h: "12h", v: 55 }, { h: "13h", v: 48 },
  { h: "14h", v: 96 }, { h: "15h", v: 103 },{ h: "16h", v: 89 },
  { h: "17h", v: 74 }, { h: "18h", v: 41 }, { h: "19h", v: 18 },
];

const TooltipStyle = {
  contentStyle: {
    backgroundColor: "#0A0F1E",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "2px",
    fontSize: "11px",
    color: "rgba(255,255,255,0.7)",
  },
  cursor: { fill: "rgba(255,255,255,0.03)" },
};

export default function PerformanceChart() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <span className="label-tag text-white/40 text-[10px]">PERFORMANCE — 7 DERNIERS JOURS</span>
        <span className="flex items-center gap-1.5 text-[10px] text-white/30">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot inline-block" />
          LIVE
        </span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 divide-x px-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="text-center py-3">
          <div className="font-display text-2xl text-green-400">2 563</div>
          <div className="label-tag text-[9px] text-white/30">appels / semaine</div>
        </div>
        <div className="text-center py-3">
          <div className="font-display text-2xl" style={{ color: "var(--gold)" }}>96%</div>
          <div className="label-tag text-[9px] text-white/30">satisfaction client</div>
        </div>
        <div className="text-center py-3">
          <div className="font-display text-2xl" style={{ color: "var(--brand-lt)" }}>1m42</div>
          <div className="label-tag text-[9px] text-white/30">durée moy. appel</div>
        </div>
      </div>

      {/* Area chart — volume hebdo */}
      <div className="px-2">
        <p className="label-tag text-[9px] text-white/20 px-3 mb-2">VOLUME D'APPELS HEBDOMADAIRE</p>
        <ResponsiveContainer width="100%" height={110}>
          <AreaChart data={WEEKLY} margin={{ top: 4, right: 8, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id="grad-appels" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#2E55D4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2E55D4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="jour" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 8 }} axisLine={false} tickLine={false} />
            <Tooltip {...TooltipStyle} formatter={(v) => [`${v} appels`, ""]} />
            <Area type="monotone" dataKey="appels" stroke="#2E55D4" strokeWidth={2} fill="url(#grad-appels)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar chart — charge horaire */}
      <div className="px-2 pb-4">
        <p className="label-tag text-[9px] text-white/20 px-3 mb-2">CHARGE PAR HEURE (AUJOURD'HUI)</p>
        <ResponsiveContainer width="100%" height={80}>
          <BarChart data={HORAIRE} margin={{ top: 0, right: 8, left: -28, bottom: 0 }} barSize={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="h" tick={{ fill: "rgba(255,255,255,0.25)", fontSize: 8 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip {...TooltipStyle} formatter={(v) => [`${v} appels`, ""]} />
            <Bar dataKey="v" fill="#F5A623" radius={[2, 2, 0, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
