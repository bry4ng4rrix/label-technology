import ProjectForm from "../ProjectForm";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Nouveau projet</h1>
      <div className="mt-6">
        <ProjectForm action={createProject} submitLabel="Créer le projet" />
      </div>
    </div>
  );
}
