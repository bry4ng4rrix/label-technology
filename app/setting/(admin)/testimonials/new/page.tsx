import TestimonialForm from "../TestimonialForm";
import { createTestimonial } from "../actions";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Nouveau témoignage</h1>
      <div className="mt-6">
        <TestimonialForm action={createTestimonial} submitLabel="Créer le témoignage" />
      </div>
    </div>
  );
}
