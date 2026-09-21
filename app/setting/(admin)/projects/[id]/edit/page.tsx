import { notFound } from "next/navigation";
import { supabase, type Project } from "@/lib/supabase";
import ProjectForm from "../../ProjectForm";
import AdminPageHeader from "../../../AdminPageHeader";
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
      <AdminPageHeader
        title={<>Modifier « {project.title} »</>}
        back={{ href: "/setting/projects", label: "Projets" }}
      />
      <div>
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
