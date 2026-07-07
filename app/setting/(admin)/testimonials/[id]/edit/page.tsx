import { notFound } from "next/navigation";
import { supabase, type Testimonial } from "@/lib/supabase";
import TestimonialForm from "../../TestimonialForm";
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
      <h1 className="text-2xl font-semibold">Modifier le témoignage de « {testimonial.author} »</h1>
      <div className="mt-6">
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
