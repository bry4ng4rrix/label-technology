import { notFound } from "next/navigation";
import { supabase, type Project } from "@/lib/supabase";
import ProjectForm from "../../ProjectForm";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .returns<Project[]>()
    .maybeSingle();
  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Modifier « {project.title} »</h1>
      <div className="mt-6">
        <ProjectForm
          action={boundUpdate}
          submitLabel="Enregistrer"
          initialValues={{
            tag: project.tag,
            title: project.title,
            desc: project.desc,
            order: project.order,
            metrics: project.metrics,
            published: project.published,
          }}
        />
      </div>
    </div>
  );
}
