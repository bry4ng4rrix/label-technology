import { notFound } from "next/navigation";
import { adminGet, type Testimonial } from "@/lib/api";
import TestimonialForm from "../../TestimonialForm";
import AdminPageHeader from "../../../AdminPageHeader";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await adminGet<Testimonial>(`/testimonials/${id}`);
  if (!testimonial) notFound();

  const boundUpdate = updateTestimonial.bind(null, testimonial.id);

  return (
    <div>
      <AdminPageHeader
        title={<>Modifier le témoignage de « {testimonial.author} »</>}
        back={{ href: "/setting/testimonials", label: "Témoignages" }}
      />
      <div>
        <TestimonialForm
          action={boundUpdate}
          submitLabel="Enregistrer"
          initialValues={{
            quote: testimonial.quote,
            author: testimonial.author,
            role: testimonial.role,
            company: testimonial.company,
            tag: testimonial.tag,
            color: testimonial.color,
            gradientColor: testimonial.gradient_color,
            context: testimonial.context,
            order: testimonial.order,
            published: testimonial.published,
          }}
        />
      </div>
    </div>
  );
}
