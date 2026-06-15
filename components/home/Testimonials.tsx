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
    color: "var(--gold)",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop&q=80",
  },
  {
    quote:
      "Livraison en 6 semaines, dans les délais et dans le budget. Le code est propre, la documentation complète. On a déjà démarré un deuxième projet — cette fois plus ambitieux.",
    author: "Hery R.",
    role: "Directeur Général",
    company: "Groupe éducatif, Antananarivo",
    tag: "Développement Web",
    color: "var(--brand)",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&q=80",
  },
  {
    quote:
      "80 000 documents numérisés en trois mois, zéro interruption de service. Chaque fichier est indexé, searchable, conforme RGPD. Label Technology a transformé une contrainte en vrai avantage opérationnel.",
    author: "Isabelle M.",
    role: "Directrice des Systèmes d'Information",
    company: "Institution publique, Madagascar",
    tag: "Traitement de données",
    color: "var(--brand-lt)",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "var(--paper)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>
            TÉMOIGNAGES CLIENTS
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Des résultats,
            <br />
            <span style={{ color: "var(--brand)" }}>pas des promesses.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card
              key={i}
              className="flex flex-col shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <CardContent className="pt-7 pb-4 flex flex-col flex-1">
                <Badge
                  variant="secondary"
                  className="text-[10px]  rounded-full border-0"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${t.color} 15%, transparent)`,
                    color: t.color,
                  }}
                >
                  {t.tag}
                </Badge>

                <div
                  className="font-display text-5xl leading-none mb-4 opacity-20"
                  style={{ color: t.color }}
                >
                  &ldquo;
                </div>

                <p className="text-base leading-relaxed font-light flex-1 text-foreground">
                  {t.quote}
                </p>
              </CardContent>

              <CardFooter className="pt-5 border-t">
                <div className="flex items-center gap-3">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    width={40}
                    height={40}
                    className="rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="font-medium text-sm mb-0.5 text-foreground">
                      {t.author}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
