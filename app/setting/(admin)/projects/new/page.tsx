import ProjectForm from "../ProjectForm";
import AdminPageHeader from "../../AdminPageHeader";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div>
      <AdminPageHeader
        title={<>Nouveau projet</>}
        back={{ href: "/setting/projects", label: "Projets" }}
      />
      <div>
        <ProjectForm action={createProject} submitLabel="Créer le projet" />
      </div>
    </div>
  );
}
