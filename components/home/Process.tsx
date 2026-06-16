"use client";

const STEPS = [
  {
    num: "01",
    title: "Écoute",
    desc: "Cadrage précis de vos enjeux avant toute proposition. On comprend votre métier, vos contraintes et vos objectifs avant de suggérer quoi que ce soit.",
    color: "#3B82F6",
    gradientColor: "from-blue-500/20 to-blue-600/10",
  },
  {
    num: "02",
    title: "Conception",
    desc: "Pas de boîte noire. Chaque étape est validée avec vous. La solution vous appartient avant même d'être développée — vous ne découvrez pas le résultat à la livraison.",
    color: "#D4AF37",
    gradientColor: "from-amber-500/20 to-yellow-600/10",
  },
  {
    num: "03",
    title: "Exécution",
    desc: "Délais tenus, budget respecté, livrables concrets et mesurables. Notre réputation se construit livraison après livraison — pas sur des promesses en avant-vente.",
    color: "#FF6B6B",
    gradientColor: "from-red-500/20 to-pink-600/10",
  },
  {
    num: "04",
    title: "Suivi",
    desc: "La livraison n'est pas la fin de l'histoire — c'est le premier jour de votre accélération. Support continu, itérations, évolutions. Votre interlocuteur reste le même, votre ambition grandit.",
    color: "#10B981",
    gradientColor: "from-emerald-500/20 to-teal-600/10",
  },
];

export default function Process() {
  return (
    <section className="relative py-24 px-6 bg-background overflow-hidden">
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.2;
          }
        }

        .animated-background {
          background: linear-gradient(
            -45deg,
            #3B82F6,
            #D4AF37,
            #FF6B6B,
            #10B981,
            #3B82F6
          );
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .process-step {
          position: relative;
          transition: all 0.3s ease;
        }

        .process-step::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .process-step:hover::before {
          opacity: 1;
        }

        .step-number {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .divider-line {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .process-step:hover .divider-line {
          transform: scaleX(1.5) translateX(4px);
          box-shadow: 0 0 12px currentColor;
        }

        .process-title {
          transition: all 0.3s ease;
        }

        .process-step:hover .process-title {
          transform: translateX(4px);
        }

        .step-content {
          position: relative;
          z-index: 2;
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-background,
          .step-number,
          .divider-line,
          .process-title {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* Animated background overlay */}
      <div className="absolute inset-0 animated-background opacity-5 blur-3xl pointer-events-none" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-14">
          <p className="label-tag mb-3" style={{ color: "#3B82F6" }}>
            NOTRE MÉTHODE
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Comment on
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
              travaille.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/30">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="process-step relative p-8 group   hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity  duration-300 bg-gradient-to-br ${step.gradientColor}`}
              />

              <div className="step-content relative z-20">
                {/* Number with glow effect */}
                <div
                  className="step-number font-display text-6xl font-extrabold mb-6 transition-all duration-300"
                  style={{
                    color: step.color,
                    opacity: 30,
                    textShadow: `0 0 20px ${step.color}80`,
                  }}
                >
                  {step.num}
                </div>

                {/* Color divider */}
                <div
                  className="divider-line w-8 h-0.5 mb-5"
                  style={{
                    backgroundColor: step.color,
                    boxShadow: `0 0 8px ${step.color}40`,
                  }}
                />

                {/* Title with color */}
                <h3
                  className="process-title font-display text-xl mb-4 transition-all duration-300"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-[15px] text-muted-foreground leading-relaxed"
                  style={{ lineHeight: 1.7 }}
                >
                  {step.desc}
                </p>

                {/* Arrow indicator */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -right-3 z-10 text-lg -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 font-bold"
                    style={{
                      color: step.color,
                      textShadow: `0 0 8px ${step.color}40`,
                    }}
                  >
                    →
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
