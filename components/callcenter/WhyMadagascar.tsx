const REASONS = [
  {
    icon: "🕐",
    title: "Même fuseau horaire",
    desc: "Madagascar est à UTC+3 — 2h de décalage avec Paris en été, 1h en hiver. Vos agents travaillent pendant vos heures de bureau, sans friction.",
    stat: "UTC+3",
  },
  {
    icon: "🗣",
    title: "Français & anglais natifs",
    desc: "Le français est langue d'enseignement officielle à Madagascar. Nos agents ont un niveau C1/C2, accent neutre, maîtrise parfaite des codes culturels européens.",
    stat: "C1/C2",
  },
  {
    icon: "💰",
    title: "Coûts jusqu'à 60% inférieurs",
    desc: "Sans compromis sur la qualité. Un poste Call Center à Antananarivo coûte une fraction d'un poste équivalent en France ou au Maroc.",
    stat: "−60%",
  },
  {
    icon: "📊",
    title: "Reporting 100% transparent",
    desc: "Dashboard en temps réel, rapports quotidiens, KPIs personnalisés. Vous savez exactement ce qui se passe, à chaque instant.",
    stat: "100%",
  },
];

export default function WhyMadagascar() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor:"var(--paper)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="label-tag mb-4" style={{ color:"var(--brand)" }}>POURQUOI MADAGASCAR ?</p>
            <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight" style={{ color:"var(--ink)" }}>
              L'avantage compétitif<br />
              <span style={{ color:"var(--brand)" }}>que vous n'attendiez pas.</span>
            </h2>
            <p className="text-base font-light leading-relaxed mb-8" style={{ color:"var(--mid)" }}>
              Madagascar n'est pas un choix par défaut. C'est un choix stratégique.
              Les entreprises qui externalisent leur call center à Antananarivo
              bénéficient d'une combinaison unique : qualité européenne, réactivité
              africaine, coût compétitif.
            </p>
            <div className="flex items-center gap-3 p-4 rounded-sm border" style={{ borderColor:"var(--brand)", backgroundColor:"rgba(30,63,171,0.04)" }}>
              <span className="text-2xl">🌍</span>
              <p className="text-sm font-light" style={{ color:"var(--ink)" }}>
                <strong>Antananarivo</strong>, capitale de Madagascar — hub technologique
                de l'océan Indien, 3,5M d'habitants, 2 universités techniques.
              </p>
            </div>
          </div>

          {/* Right — 4 raisons */}
          <div className="grid grid-cols-2 gap-px bg-black/10">
            {REASONS.map((r, i) => (
              <div key={i} className="p-6 flex flex-col gap-3" style={{ backgroundColor:"var(--white)" }}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{r.icon}</span>
                  <span className="font-display text-2xl" style={{ color:"var(--brand)" }}>{r.stat}</span>
                </div>
                <h3 className="font-display text-base" style={{ color:"var(--ink)" }}>{r.title}</h3>
                <p className="text-xs font-light leading-relaxed" style={{ color:"var(--mid)" }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
