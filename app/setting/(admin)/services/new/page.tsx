import ServiceForm from "../ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Nouveau service</h1>
      <div className="mt-6">
        <ServiceForm action={createService} submitLabel="Créer le service" />
      </div>
    </div>
  );
}
