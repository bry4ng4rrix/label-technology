import { prisma } from "@/lib/db";
import ComingSoon from "../ComingSoon";

export default async function ContentAdminPage() {
  const count = await prisma.setting.count();
  return <ComingSoon title="Contenu du site" count={count} />;
}
