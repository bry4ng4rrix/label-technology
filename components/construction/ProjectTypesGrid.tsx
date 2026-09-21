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
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROJECT_TYPES.map((p, i) => (
          <Reveal key={i} delay={i * 0.05} className="h-full">
            <div className="card-premium flex h-full items-center gap-4 p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand/8 text-xl leading-none">
                {p.icon}
              </span>
              <h3 className="font-display text-base font-semibold text-foreground">
                {p.title}
              </h3>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <p className="meta mx-auto mt-12 max-w-xl text-center italic">
          Cette activité étant actuellement en développement, notre
          portefeuille de réalisations sera progressivement enrichi.
        </p>
      </Reveal>
    </div>
  );
}
