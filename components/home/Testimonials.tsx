"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TESTIMONIALS = [
  {
    quote:
      "On cherchait un call center francophone fiable pour nos campagnes B2B en France. On a trouvé une équipe qui comprend nos prospects mieux que certains de nos propres commerciaux. Taux de prise de RDV en hausse de 40% dès le deuxième mois.",
    author: "François B.",
    role: "Directeur Commercial",
    company: "PME industrielle, Lyon",
    tag: "Call Center",
    color: "#D4AF37",
    gradientColor: "from-amber-500/20 to-yellow-600/10",
  },
  {
    quote:
      "Livraison en 6 semaines, dans les délais et dans le budget. Le code est propre, la documentation complète. On a déjà démarré un deuxième projet — cette fois plus ambitieux.",
    author: "Hery R.",
    role: "Directeur Général",
    company: "Groupe éducatif, Antananarivo",
    tag: "Développement Web",
    color: "#3B82F6",
    gradientColor: "from-blue-500/20 to-blue-600/10",
  },
  {
    quote:
      "80 000 documents numérisés en trois mois, zéro interruption de service. Chaque fichier est indexé, searchable, conforme RGPD. Label Technology a transformé une contrainte en vrai avantage opérationnel.",
    author: "Isabelle M.",
    role: "Directrice des Systèmes d'Information",
    company: "Institution publique, Madagascar",
    tag: "Traitement de données",
    color: "#10B981",
    gradientColor: "from-emerald-500/20 to-teal-600/10",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 px-6 bg-background overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .testimonial-card {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          position: relative;
        }

        .testimonial-card:nth-child(1) { animation: fadeInUp 0.6s ease-out 0.1s forwards; }
        .testimonial-card:nth-child(2) { animation: fadeInUp 0.6s ease-out 0.2s forwards; }
        .testimonial-card:nth-child(3) { animation: fadeInUp 0.6s ease-out 0.3s forwards; }

        .testimonial-card {
          border-l: 4px solid;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
        }

        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .testimonial-card:hover::before {
          opacity: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-card {
            animation: none !important;
            opacity: 1 !important;
          }

          .testimonial-card:hover {
            transform: none;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <p className="label-tag mb-3" style={{ color: "#3B82F6" }}>
            TÉMOIGNAGES CLIENTS
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Des résultats,
            <br />
            <span className="bg-gradient-to-r from-blue-500  to-emerald-500 bg-clip-text text-transparent">
              pas des promesses.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-card rounded-lg border-l hover:border hover:border-stone-200  transition-all duration-300  border-dashed  overflow-hidden"
              style={{ borderLeftColor: t.color }}
            >
              <CardContent className="pt-8 pb-6 flex flex-col flex-1">
                <Badge
                  variant="secondary"
                  className="text-[10px] rounded-full border-0 w-fit mb-4 font-semibold"
                  style={{
                    backgroundColor: `${t.color}20`,
                    color: t.color,
                  }}
                >
                  {t.tag}
                </Badge>

                <p className="text-base leading-relaxed text-foreground flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </CardContent>

              <CardFooter className="px-8 pb-8 border-t border-border/50 pt-6">
                <div className="flex items-center gap-4 w-full">
                  {/* <Image
                    src={t.avatar}
                    alt={t.author}
                    width={44}
                    height={44}
                    className="rounded-full object-cover shrink-0"
                  /> */}
                  <div className="min-w-0 flex-1">
                    <div
                      className="font-semibold text-sm mb-1"
                      style={{ color: t.color }}
                    >
                      {t.author}
                    </div>
                    <div className="text-xs text-muted-foreground leading-snug">
                      {t.role}
                      <br />
                      {t.company}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
