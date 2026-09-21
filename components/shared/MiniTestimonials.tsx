import { Quote } from "lucide-react";
import Reveal from "@/components/shared/Reveal";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export default function MiniTestimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <section className="surface-light section-sm relative overflow-hidden">
      <div className="container-x">
        <Reveal>
          <p className="label-tag mb-10 flex items-center justify-center gap-3 text-brand">
            <span className="h-px w-6 bg-brand/50" />
            Ils nous font confiance
            <span className="h-px w-6 bg-brand/50" />
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <figure className="card-premium flex h-full flex-col p-7">
                <Quote className="mb-5 size-5 text-brand/40" />
                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-border/70 pt-4">
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} — {t.company}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
