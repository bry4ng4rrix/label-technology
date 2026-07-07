import { notFound } from "next/navigation";
import { supabase, type JobOffer } from "@/lib/supabase";
import JobOfferForm from "../../JobOfferForm";
import { updateJobOffer } from "../../actions";

export default async function EditJobOfferPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [{ data: offer }, { data: servicesData }] = await Promise.all([
    supabase.from("job_offers").select("*").eq("id", id).returns<JobOffer[]>().maybeSingle(),
    supabase.from("services").select("tag").order("order", { ascending: true }),
  ]);
  if (!offer) notFound();
  const serviceTags = Array.from(new Set((servicesData ?? []).map((s) => s.tag as string)));

  const boundUpdate = updateJobOffer.bind(null, offer.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Modifier « {offer.title} »</h1>
      <div className="mt-6">
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
