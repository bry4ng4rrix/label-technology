import Reveal from "@/components/shared/Reveal";

const PROJECT_TYPES = [
  { icon: "🏠", title: "Construction résidentielle" },
  { icon: "🏢", title: "Bâtiments professionnels" },
  { icon: "🏬", title: "Bâtiments commerciaux" },
  { icon: "🌉", title: "Infrastructures" },
  { icon: "🗺", title: "Aménagements" },
  { icon: "🔧", title: "Rénovation" },
  { icon: "🏭", title: "Projets industriels" },
  { icon: "🏛", title: "Projets publics" },
];

export default function ProjectTypesGrid() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {PROJECT_TYPES.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="p-6 border border-border rounded-sm bg-card h-full">
              <span className="text-2xl mb-3 block">{p.icon}</span>
              <h3 className="font-display text-base text-foreground">
                {p.title}
              </h3>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="text-sm font-light italic text-center mt-12 text-muted-foreground max-w-xl mx-auto">
          Cette activité étant actuellement en développement, notre
          portefeuille de réalisations sera progressivement enrichi.
        </p>
      </Reveal>
    </div>
  );
}
