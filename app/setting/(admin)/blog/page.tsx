import { prisma } from "@/lib/db";
import ComingSoon from "../ComingSoon";

export default async function BlogAdminPage() {
  const count = await prisma.blogPost.count();
  return <ComingSoon title="Blog" count={count} />;
}
