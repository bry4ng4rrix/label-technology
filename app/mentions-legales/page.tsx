export default function MentionsLegalesPage() {
  return (
    <main>
      <section className="px-6 pt-28 pb-24" style={{ backgroundColor: "var(--paper)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="label-tag mb-4" style={{ color: "var(--brand)" }}>LÉGAL</p>
          <h1 className="font-display text-4xl mb-12 text-foreground">Mentions légales</h1>

          <div className="space-y-10 text-sm font-light leading-relaxed text-muted-foreground">
            <section>
              <h2 className="font-display text-xl mb-4 text-foreground">Éditeur du site</h2>
              <p>
                <strong className="text-foreground">Label Technology</strong><br />
                Akany Riandrano, Manajak Ilafy<br />
                Antananarivo Avaradrano, Madagascar<br />
                Tél. : +261 34 05 031 29<br />
                Email : contact@labeltechnology.mg
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-4 text-foreground">Hébergement</h2>
              <p>
                Ce site est hébergé par <strong className="text-foreground">Vercel Inc.</strong><br />
                440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
                <a href="https://vercel.com" className="hover:underline" style={{ color: "var(--brand)" }}>
                  vercel.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-4 text-foreground">Propriété intellectuelle</h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, logos, graphismes) est la
                propriété exclusive de Label Technology. Toute reproduction, représentation,
                modification ou adaptation, totale ou partielle, de ce site ou de son contenu,
                est interdite sans l&apos;accord préalable et écrit de Label Technology.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-4 text-foreground">Protection des données</h2>
              <p>
                Label Technology s&apos;engage à protéger vos données personnelles conformément
                aux réglementations en vigueur. Les données collectées via ce site sont
                utilisées uniquement dans le cadre des services proposés et ne sont pas
                transmises à des tiers sans votre consentement.
              </p>
              <p className="mt-3">
                Vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos
                données. Pour exercer ces droits, contactez-nous à :
                <a href="mailto:contact@labeltechnology.mg" className="ml-1 hover:underline" style={{ color: "var(--brand)" }}>
                  contact@labeltechnology.mg
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-4 text-foreground">Cookies</h2>
              <p>
                Ce site peut utiliser des cookies techniques nécessaires à son fonctionnement.
                Aucun cookie publicitaire ou de tracking tiers n&apos;est déposé sans votre
                consentement explicite.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl mb-4 text-foreground">Liens externes</h2>
              <p>
                Label Technology ne peut être tenu responsable du contenu des sites externes
                vers lesquels ce site renvoie. Ces liens sont fournis à titre informatif uniquement.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
