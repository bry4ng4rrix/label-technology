import ServiceForm from "../ServiceForm";
import AdminPageHeader from "../../AdminPageHeader";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeader
        title={<>Nouveau service</>}
        back={{ href: "/setting/services", label: "Services" }}
      />
      <div>
        <ServiceForm action={createService} submitLabel="Créer le service" />
      </div>
    </div>
  );
}
