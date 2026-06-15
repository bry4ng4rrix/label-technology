"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqItem = {
  q: string;
  a: string;
};

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <p className="label-tag mb-3" style={{ color: "var(--brand)" }}>FAQ</p>
        <h2 className="font-display text-4xl md:text-5xl mb-12 text-foreground">
          Questions fréquentes.
        </h2>
        <Accordion type="single" collapsible defaultValue="item-0">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="font-display text-lg py-5 hover:no-underline text-left text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm font-light leading-relaxed pb-6 text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
