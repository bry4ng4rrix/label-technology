import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ServiceForm from "../../ServiceForm";
import { updateService } from "../../actions";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
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
            headlineAccent: service.headlineAccent,
            desc: service.desc,
            color: service.color,
            icon: service.icon,
            imageUrl: service.imageUrl,
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
