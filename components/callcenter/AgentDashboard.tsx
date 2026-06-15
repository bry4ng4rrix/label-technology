"use client";

import { useEffect, useState } from "react";

type Status = "EN APPEL" | "DISPONIBLE" | "PAUSE" | "FORMATION";

type Agent = {
  id: number;
  name: string;
  status: Status;
  duration: string;
  lang: "FR" | "EN" | "FR/EN";
};

const AGENTS: Agent[] = [
  { id:1,  name:"Haja R.",    status:"EN APPEL",   duration:"04:32", lang:"FR" },
  { id:2,  name:"Miora T.",   status:"EN APPEL",   duration:"11:08", lang:"FR/EN" },
  { id:3,  name:"Faniry A.",  status:"DISPONIBLE", duration:"",      lang:"EN" },
  { id:4,  name:"Vola M.",    status:"EN APPEL",   duration:"02:17", lang:"FR" },
  { id:5,  name:"Rado B.",    status:"PAUSE",      duration:"03:00", lang:"FR/EN" },
  { id:6,  name:"Tiana J.",   status:"EN APPEL",   duration:"07:44", lang:"FR" },
  { id:7,  name:"Lalao S.",   status:"DISPONIBLE", duration:"",      lang:"EN" },
  { id:8,  name:"Fara N.",    status:"EN APPEL",   duration:"01:55", lang:"FR/EN" },
  { id:9,  name:"Noro H.",    status:"EN APPEL",   duration:"09:21", lang:"FR" },
  { id:10, name:"Zo R.",      status:"PAUSE",      duration:"01:00", lang:"FR/EN" },
  { id:11, name:"Soa T.",     status:"DISPONIBLE", duration:"",      lang:"EN" },
  { id:12, name:"Bodo M.",    status:"EN APPEL",   duration:"05:38", lang:"FR" },
  { id:13, name:"Aina R.",    status:"EN APPEL",   duration:"03:12", lang:"FR/EN" },
  { id:14, name:"Lova T.",    status:"DISPONIBLE", duration:"",      lang:"FR" },
  { id:15, name:"Koto A.",    status:"FORMATION",  duration:"",      lang:"FR/EN" },
  { id:16, name:"Mamy S.",    status:"EN APPEL",   duration:"08:45", lang:"EN" },
];

const COLORS: Record<Status, string> = {
  "EN APPEL":   "#22c55e",
  "DISPONIBLE": "#2E55D4",
  "PAUSE":      "#F5A623",
  "FORMATION":  "#a78bfa",
};

export default function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>(AGENTS);

  useEffect(() => {
    const id = setInterval(() => {
      setAgents(prev => prev.map(a => {
        if (Math.random() < 0.1) {
          const statuses: Status[] = ["EN APPEL", "DISPONIBLE", "PAUSE"];
          const next = statuses[Math.floor(Math.random() * statuses.length)];
          return { ...a, status: next, duration: next === "EN APPEL" ? "00:01" : "" };
        }
        return a;
      }));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const counts = {
    "EN APPEL":   agents.filter(a => a.status === "EN APPEL").length,
    "DISPONIBLE": agents.filter(a => a.status === "DISPONIBLE").length,
    "PAUSE":      agents.filter(a => a.status === "PAUSE").length,
    "FORMATION":  agents.filter(a => a.status === "FORMATION").length,
  };

  return (
    <div className="rounded-sm overflow-hidden border" style={{ borderColor:"rgba(255,255,255,0.08)", backgroundColor:"rgba(0,0,0,0.5)" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        <span className="label-tag text-white/40 text-[10px]">TABLEAU DE BORD — AGENTS EN DIRECT</span>
        <span className="flex items-center gap-2 text-[10px] text-white/30">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot inline-block" />
          LIVE · {AGENTS.length} POSTES ACTIFS
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 divide-x text-center py-4" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        {(Object.entries(counts) as [Status, number][]).map(([status, count]) => (
          <div key={status} className="px-1">
            <div className="font-display text-2xl" style={{ color: COLORS[status] }}>{count}</div>
            <div className="label-tag text-white/30 mt-0.5 truncate" style={{ fontSize: "8px" }}>{status}</div>
          </div>
        ))}
      </div>

      {/* Agent list */}
      <div className="divide-y max-h-80 overflow-y-auto" style={{ borderColor:"rgba(255,255,255,0.04)" }}>
        {agents.map(agent => (
          <div key={agent.id} className="flex items-center justify-between px-5 py-2 hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: COLORS[agent.status], display:"inline-block" }} />
              <span className="text-white/60 text-xs">{agent.name}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-sm" style={{ backgroundColor:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.3)" }}>
                {agent.lang}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {agent.duration && (
                <span className="text-white/20 text-[10px] font-mono">{agent.duration}</span>
              )}
              <span className="label-tag text-[9px] px-2 py-0.5 rounded-sm"
                style={{ color: COLORS[agent.status], backgroundColor:`${COLORS[agent.status]}18` }}>
                {agent.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-2.5 border-t text-center" style={{ borderColor:"rgba(255,255,255,0.06)" }}>
        <span className="text-white/15 text-[10px]">+ {50 - AGENTS.length} agents · simulation temps réel</span>
      </div>
    </div>
  );
}
