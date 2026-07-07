import { prisma } from "@/lib/db";
import ComingSoon from "../ComingSoon";

export default async function ProjectsAdminPage() {
  const count = await prisma.project.count();
  return <ComingSoon title="Projets" count={count} />;
}
