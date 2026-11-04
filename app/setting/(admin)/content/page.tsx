import { adminGet, type SiteStats } from "@/lib/api";
import ComingSoon from "../ComingSoon";

export default async function ContentAdminPage() {
  const stats = await adminGet<SiteStats>("/statistiques");
  return <ComingSoon title="Contenu du site" count={stats?.settings ?? 0} />;
}
