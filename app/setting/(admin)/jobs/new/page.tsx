import { supabase } from "@/lib/supabase";
import JobOfferForm from "../JobOfferForm";
import { createJobOffer } from "../actions";

export default async function NewJobOfferPage() {
  const { data } = await supabase.from("services").select("tag").order("order", { ascending: true });
  const serviceTags = Array.from(new Set((data ?? []).map((s) => s.tag as string)));

  return (
    <div>
      <h1 className="text-2xl font-semibold">Nouvelle offre d&apos;emploi</h1>
      <div className="mt-6">
        <JobOfferForm action={createJobOffer} submitLabel="Créer l'offre" serviceTags={serviceTags} />
      </div>
    </div>
  );
}
