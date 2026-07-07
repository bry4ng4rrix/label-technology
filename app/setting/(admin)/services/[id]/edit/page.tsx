import { notFound } from "next/navigation";
import { supabase, type Service } from "@/lib/supabase";
import ServiceForm from "../../ServiceForm";
import { updateService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .returns<Service[]>()
    .maybeSingle();
  if (!service) notFound();

  const boundUpdate = updateService.bind(null, service.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Modifier « {service.headline} »</h1>
      <div className="mt-6">
        <ServiceForm
          action={boundUpdate}
          submitLabel="Enregistrer"
          initialValues={{
            slug: service.slug,
            tag: service.tag,
            headline: service.headline,
            headlineAccent: service.headline_accent,
            desc: service.desc,
            color: service.color,
            icon: service.icon,
            imageUrl: service.image_url,
            badge: service.badge,
            items: service.items,
            featured: service.featured,
            published: service.published,
          }}
        />
      </div>
    </div>
  );
}
