import Reveal from "@/components/shared/Reveal";

export default function ActivityNotice() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: "var(--paper)" }}>
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="label-tag mb-5" style={{ color: "var(--brand)" }}>
            UNE ACTIVITÉ EN CONSTRUCTION
          </p>
          <p className="text-[15px] md:text-lg font-light leading-relaxed text-muted-foreground" style={{ lineHeight: 1.8 }}>
            Notre offre Construction est actuellement en développement. Nous
            construisons progressivement notre réseau de partenaires et notre
            capacité d&apos;intervention afin de proposer des solutions
            adaptées aux différents besoins du secteur.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
