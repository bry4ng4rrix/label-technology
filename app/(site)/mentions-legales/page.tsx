import type { Metadata } from "next";
import Reveal from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de Label Technology : éditeur, hébergement, propriété intellectuelle et données personnelles.",
  alternates: {
    canonical: "https://labeltechnology.mg/mentions-legales",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://labeltechnology.mg/mentions-legales",
    siteName: "Label Technology",
    title: "Mentions légales | Label Technology",
    description: "Éditeur, hébergement, propriété intellectuelle et données personnelles.",
  },
};

export default function MentionsLegalesPage() {
  return (
    <main>
      <section className="surface-light relative overflow-hidden pt-32 pb-24 sm:pt-36 lg:pt-40">
        <div aria-hidden className="grid-fade absolute inset-0 -z-10 opacity-50" />
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="label-tag mb-4 inline-flex items-center gap-2.5 text-brand">
              <span className="h-px w-6 bg-brand/60" />
              Légal
            </p>
            <h1 className="h2-display mb-12 text-foreground">Mentions légales</h1>
          </Reveal>

          <Reveal delay={0.1} className="card-premium space-y-10 p-6 text-[15px] leading-relaxed text-muted-foreground hover:translate-y-0 sm:p-10">
            <section>
              <h2 className="h3-display mb-4 text-foreground">Éditeur du site</h2>
              <p>
                <strong className="text-foreground">Label Technology</strong><br />
                Akany Riandrano, Manajak Ilafy<br />
                Antananarivo Avaradrano, Madagascar<br />
                Tél. : +261 34 05 031 29<br />
                Email : contact@labeltechnology.mg
              </p>
            </section>

            <section>
              <h2 className="h3-display mb-4 text-foreground">Hébergement</h2>
              <p>
                Ce site est hébergé par <strong className="text-foreground">Vercel Inc.</strong><br />
                440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
                <a href="https://vercel.com" className="font-medium text-brand hover:underline">
                  vercel.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="h3-display mb-4 text-foreground">Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la
                propriété exclusive de Label Technology. Toute reproduction, représentation,
                modification ou adaptation, totale ou partielle, de ce site ou de son contenu,
                est interdite sans l&apos;accord préalable et écrit de Label Technology.
              </p>
            </section>

            <section>
              <h2 className="h3-display mb-4 text-foreground">Protection des données</h2>
              <p>
                Label Technology s&apos;engage à protéger vos données personnelles conformément
                aux réglementations en vigueur. Les données collectées via ce site sont
                utilisées uniquement dans le cadre des services proposés et ne sont pas
                transmises à des tiers sans votre consentement.
              </p>
              <p className="mt-3">
                Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
                données. Pour exercer ces droits, contactez-nous à :
                <a href="mailto:contact@labeltechnology.mg" className="ml-1 font-medium text-brand hover:underline">
                  contact@labeltechnology.mg
                </a>
              </p>
            </section>

            <section>
              <h2 className="h3-display mb-4 text-foreground">Cookies</h2>
              <p>
                Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement.
                Aucun cookie publicitaire ou de tracking tiers n&apos;est déposé sans votre
                consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="h3-display mb-4 text-foreground">Liens externes</h2>
              <p>
                Label Technology ne peut être tenu responsable du contenu des sites externes
                vers lesquels ce site renvoie. Ces liens sont fournis à titre informatif uniquement.
              </p>
            </section>
          </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
