import Reveal from "@/components/shared/Reveal";

export default function ActivityNotice() {
  return (
    <section className="surface-light section-sm relative">
      <div className="container-x">
        <Reveal className="glass-strong mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-10">
          <p className="label-tag mb-5 inline-flex items-center gap-3 text-brand">
            <span className="h-px w-6 bg-brand/60" />
            Une activité en construction
            <span className="h-px w-6 bg-brand/60" />
          </p>
          <p className="prose-body text-muted-foreground md:text-lg">
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
