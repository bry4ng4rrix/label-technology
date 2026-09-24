import PhotoPanel from "@/components/services/PhotoPanel";
import Reveal from "@/components/shared/Reveal";

const PROJECT_TYPES = [
  { icon: "🏠", title: "Construction résidentielle", image: "/images/construction/entreprise-hero.jpg" },
  { icon: "🏢", title: "Bâtiments professionnels", image: "/images/construction/entreprise-band.jpg" },
  { icon: "🏬", title: "Bâtiments commerciaux", image: "/images/construction/projets-hero.jpg" },
  { icon: "🌉", title: "Infrastructures", image: "/images/construction/route-hero.jpg" },
  { icon: "🗺", title: "Aménagements", image: "/images/construction/route-band.jpg" },
  { icon: "🔧", title: "Rénovation", image: "/images/construction/band.jpg" },
  { icon: "🏭", title: "Projets industriels", image: "/images/construction/projets-band.jpg" },
  { icon: "🏛", title: "Projets publics", image: "/images/construction/hero.jpg" },
];

export default function ProjectTypesGrid() {
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROJECT_TYPES.map((p, i) => (
          <Reveal key={i} delay={i * 0.05} className="h-full">
            <article className="group flex h-full flex-col">
              <div className="relative">
                <PhotoPanel
                  src={p.image}
                  alt=""
                  ratio="4/3"
                  tone="light"
                  tint="soft"
                  quality={60}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="rounded-2xl"
                />
                <span className="glass-card absolute -bottom-4 left-4 flex size-10 items-center justify-center text-lg leading-none" data-tone="dark">
                  {p.icon}
                </span>
              </div>
              <h3 className="font-display mt-9 text-base leading-snug font-semibold text-foreground">
                {p.title}
              </h3>
            </article>
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
