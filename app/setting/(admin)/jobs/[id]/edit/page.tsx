import { notFound } from "next/navigation";
import { adminGet, type JobOffer, type Service } from "@/lib/api";
import JobOfferForm from "../../JobOfferForm";
import AdminPageHeader from "../../../AdminPageHeader";
import { updateJobOffer } from "../../actions";

export default async function EditJobOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [offer, servicesData] = await Promise.all([
    adminGet<JobOffer>(`/job-offers/${id}`),
    adminGet<Service[]>("/services"),
  ]);
  if (!offer) notFound();
  const serviceTags = Array.from(new Set((servicesData ?? []).map((s) => s.tag)));

  const boundUpdate = updateJobOffer.bind(null, offer.id);

  return (
    <div>
      <AdminPageHeader
        title={<>Modifier « {offer.title} »</>}
        back={{ href: "/setting/jobs", label: "Offres d'emploi" }}
      />
      <div>
        <JobOfferForm
          action={boundUpdate}
          submitLabel="Enregistrer"
          serviceTags={serviceTags}
          initialValues={{
            tag: offer.tag,
            title: offer.title,
            contrat: offer.contrat,
            lieu: offer.lieu,
            niveau: offer.niveau,
            desc: offer.desc,
            order: offer.order,
            missions: offer.missions,
            urgent: offer.urgent,
            published: offer.published,
          }}
        />
      </div>
    </div>
  );
}
