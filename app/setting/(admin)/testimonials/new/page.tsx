import TestimonialForm from "../TestimonialForm";
import AdminPageHeader from "../../AdminPageHeader";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminPageHeader
        title={<>Nouveau témoignage</>}
        back={{ href: "/setting/testimonials", label: "Témoignages" }}
      />
      <div>
        <TestimonialForm action={createTestimonial} submitLabel="Créer le témoignage" />
      </div>
    </div>
  );
}
