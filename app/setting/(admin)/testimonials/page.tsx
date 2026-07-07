import { prisma } from "@/lib/db";
import ComingSoon from "../ComingSoon";

export default async function TestimonialsAdminPage() {
  const count = await prisma.testimonial.count();
  return <ComingSoon title="Témoignages" count={count} />;
}
