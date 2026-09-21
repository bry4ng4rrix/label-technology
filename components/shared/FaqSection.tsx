"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "@/components/shared/Reveal";
import SectionHeader from "@/components/shared/SectionHeader";

type FaqItem = {
  q: string;
  a: string;
};

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="section bg-background">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader
            eyebrow="FAQ"
            title="Questions fréquentes."
            description="Les réponses aux questions qu'on nous pose le plus souvent avant de démarrer."
            className="mb-0 lg:sticky lg:top-28 lg:self-start"
          />
          <Reveal delay={0.1}>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-0"
              className="card-premium divide-y divide-border/70 px-2 hover:translate-y-0 sm:px-4"
            >
              {items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-0">
                  <AccordionTrigger className="font-display px-2 py-5 text-left text-[15px] font-semibold text-foreground hover:no-underline sm:text-base [&[data-state=open]]:text-brand">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-2 pb-6 text-[15px] leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
