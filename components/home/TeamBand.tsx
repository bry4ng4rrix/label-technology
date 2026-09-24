import PhotoBand from "@/components/services/PhotoBand";
import PhotoMosaic from "@/components/services/PhotoMosaic";
import ServiceScope from "@/components/services/ServiceScope";

/**
 * Temps fort photographique de la page d'accueil.
 *
 * Deux compositions : un bandeau plein cadre sur nos locaux réels, puis une
 * mosaïque asymétrique. Les photos sont celles de l'équipe et du plateau
 * d'Antananarivo — plus crédibles que des images d'illustration pour appuyer
 * un discours d'agence.
 */
export default function TeamBand() {
  return (
    <ServiceScope slug="index">
      <PhotoBand
        tint="normal"
        image={{
          src: "/images/services/fetra.jpg",
          alt: "Le plateau de Label Technology à Antananarivo",
        }}
        eyebrow="Nos locaux, notre équipe"
        title={
          <>
            Une équipe réunie
            <br />
            sous le même toit.
          </>
        }
        stats={[
          { value: "16+", label: "collaborateurs" },
          { value: "Ilafy", label: "Antananarivo" },
          { value: "UTC+3", label: "vos heures de bureau" },
        ]}
      >
        Pas de sous-traitance en cascade : les personnes qui cadrent votre
        projet sont celles qui le livrent, depuis nos bureaux d&apos;Antananarivo.
      </PhotoBand>

      <section className="surface-light section relative overflow-hidden">
        <div className="container-x">
          <PhotoMosaic
            eyebrow="Au quotidien"
            title={
              <>
                Six pôles qui travaillent
                <br />
                côte à côte.
              </>
            }
            images={[
              { src: "/images/services/digit.jpg", alt: "Équipe en session de travail" },
              { src: "/images/services/it.jpg", alt: "Matériel informatique et infrastructure" },
            ]}
          >
            Développement, marketing, digitalisation, données, matériel et
            comptabilité partagent le même plateau. Quand votre projet touche
            deux métiers, la discussion se fait dans le couloir — pas par
            courriel entre deux prestataires.
          </PhotoMosaic>
        </div>
      </section>
    </ServiceScope>
  );
}
