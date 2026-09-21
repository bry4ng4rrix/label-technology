import { notFound } from "next/navigation";
import { supabase, type Testimonial } from "@/lib/supabase";
import TestimonialForm from "../../TestimonialForm";
import AdminPageHeader from "../../../AdminPageHeader";
import { updateTestimonial } from "../../actions";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: testimonial } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .returns<Testimonial[]>()
    .maybeSingle();
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
