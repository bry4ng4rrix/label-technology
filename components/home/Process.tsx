"use client";

const STEPS = [
  {
    num: "01",
    title: "Écoute",
    desc: "Cadrage précis de vos enjeux avant toute proposition. On comprend votre métier, vos contraintes et vos objectifs avant de suggérer quoi que ce soit.",
    color: "var(--brand)",
  },
  {
    num: "02",
    title: "Conception",
    desc: "Pas de boîte noire. Chaque étape est validée avec vous. La solution vous appartient avant même d'être développée — vous ne découvrez pas le résultat à la livraison.",
    color: "var(--gold)",
  },
  {
    num: "03",
    title: "Exécution",
    desc: "Délais tenus, budget respecté, livrables concrets et mesurables. Notre réputation se construit livraison après livraison — pas sur des promesses en avant-vente.",
    color: "var(--coral)",
  },
  {
    num: "04",
    title: "Suivi",
    desc: "La livraison n'est pas la fin de l'histoire — c'est le premier jour de votre accélération. Support continu, itérations, évolutions. Votre interlocuteur reste le même, votre ambition grandit.",
    color: "var(--brand-lt)",
  },
];

export default function Process() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>NOTRE MÉTHODE</p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Comment on travaille.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="relative p-8 group bg-card hover:bg-accent transition-colors"
            >
              <div
                className="font-display text-6xl font-extrabold mb-6 opacity-15 group-hover:opacity-25 transition-opacity"
                style={{ color: step.color, lineHeight: 1 }}
              >
                {step.num}
              </div>

              <div className="w-8 h-0.5 mb-5" style={{ backgroundColor: step.color }} />

              <h3 className="font-display text-xl mb-4 text-foreground">
                {step.title}
              </h3>

              <p className="text-[15px] text-muted-foreground" style={{ lineHeight: 1.7 }}>
                {step.desc}
              </p>

              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-1/2 -right-3 z-10 text-lg -translate-y-1/2"
                  style={{ color: step.color }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
