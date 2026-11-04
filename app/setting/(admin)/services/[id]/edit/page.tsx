import { notFound } from "next/navigation";
import { adminGet, type Service } from "@/lib/api";
import ServiceForm from "../../ServiceForm";
import AdminPageHeader from "../../../AdminPageHeader";
import { updateService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await adminGet<Service>(`/services/${id}`);
  if (!service) notFound();

  const boundUpdate = updateService.bind(null, service.id);

  return (
    <div>
      <AdminPageHeader
        title={<>Modifier « {service.headline} »</>}
        back={{ href: "/setting/services", label: "Services" }}
      />
      <div>
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
