import { countRows } from "@/lib/supabase";
import ComingSoon from "../ComingSoon";

export default async function ContentAdminPage() {
  const count = await countRows("settings");
  return <ComingSoon title="Contenu du site" count={count} />;
}
