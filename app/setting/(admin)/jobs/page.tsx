import { prisma } from "@/lib/db";
import ComingSoon from "../ComingSoon";

export default async function JobsAdminPage() {
  const count = await prisma.jobOffer.count();
  return <ComingSoon title="Emplois" count={count} />;
}
