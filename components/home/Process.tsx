import PhotoPanel from "@/components/services/PhotoPanel";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";

const STEPS = [
  {
    num: "01",
    title: "Écoute",
    desc: "Cadrage précis de vos enjeux avant toute proposition. On comprend votre métier, vos contraintes et vos objectifs avant de suggérer quoi que ce soit.",
    color: "#3B82F6",
    image: "/images/services/digital/mosaic-b.jpg",
  },
  {
    num: "02",
    title: "Conception",
    desc: "Pas de boîte noire. Chaque étape est validée avec vous. La solution vous appartient avant même d'être développée — vous ne découvrez pas le résultat à la livraison.",
    color: "#D4AF37",
    image: "/images/services/marketing/mosaic-a.jpg",
  },
  {
    num: "03",
    title: "Exécution",
    desc: "Délais tenus, budget respecté, livrables concrets et mesurables. Notre réputation se construit livraison après livraison — pas sur des promesses en avant-vente.",
    color: "#FF6B6B",
    image: "/images/services/dev/mosaic-a.jpg",
  },
  {
    num: "04",
    title: "Suivi",
    desc: "La livraison n'est pas la fin de l'histoire — c'est le premier jour de votre accélération. Support continu, itérations, évolutions. Votre interlocuteur reste le même, votre ambition grandit.",
    color: "#10B981",
    image: "/images/services/comptabilite/mosaic-a.jpg",
  },
];

export default function Process() {
  return (
    <section className="section relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="halo -top-24 -right-32 -z-10 h-[420px] w-[520px] bg-brand-lt/10"
      />

      <div className="container-x">
        <SectionHeader
          eyebrow="Notre méthode"
          title={
            <>
              Comment on <span className="gradient-text">travaille.</span>
            </>
          }
          description="Quatre étapes, un interlocuteur unique, zéro boîte noire."
        />

        <ol className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08} className="h-full">
              <li
                className="group flex h-full flex-col"
                style={{ ["--accent" as string]: step.color, ["--svc" as string]: step.color }}
              >
                <PhotoPanel
                  src={step.image}
                  alt=""
                  ratio="4/3"
                  tone="light"
                  tint="soft"
                  quality={60}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="mb-7 rounded-2xl"
                />
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="font-display text-4xl tracking-tight text-foreground/15 transition-colors duration-300 group-hover:text-[var(--accent)]"
                  >
                    {step.num}
                  </span>
                  <span
                    className="relative z-10 size-3 rounded-full ring-4 ring-background transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 0 1px ${step.color}55` }}
                  />
                </div>
                <h3 className="h3-display text-foreground">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
                <span
                  className="mt-auto pt-6 text-xs font-semibold tracking-wide uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: step.color }}
                >
                  Étape {i + 1} / {STEPS.length}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
