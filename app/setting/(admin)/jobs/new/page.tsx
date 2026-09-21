import { supabase } from "@/lib/supabase";
import JobOfferForm from "../JobOfferForm";
import AdminPageHeader from "../../AdminPageHeader";
import { createJobOffer } from "../actions";

export default async function NewJobOfferPage() {
  const { data } = await supabase.from("services").select("tag").order("order", { ascending: true });
  const serviceTags = Array.from(new Set((data ?? []).map((s) => s.tag as string)));

  return (
    <div>
      <AdminPageHeader
        title={<>Nouvelle offre d&apos;emploi</>}
        back={{ href: "/setting/jobs", label: "Offres d'emploi" }}
      />
      <div>
        <JobOfferForm action={createJobOffer} submitLabel="Créer l'offre" serviceTags={serviceTags} />
      </div>
    </div>
  );
}
