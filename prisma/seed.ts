import { PrismaClient } from "@prisma/client";
import {
  services,
  projectTagMeta,
  projects,
  jobTagMeta,
  jobOffers,
  blogPosts,
  testimonialsHome,
  testimonialsAbout,
} from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.$transaction(async (tx) => {
    for (const service of services) {
      await tx.service.upsert({
        where: { slug: service.slug },
        create: service,
        update: service,
      });
    }

    for (const meta of projectTagMeta) {
      await tx.tagMeta.upsert({
        where: { kind_name: { kind: "PROJECT", name: meta.name } },
        create: { ...meta, kind: "PROJECT" },
        update: { ...meta, kind: "PROJECT" },
      });
    }
    for (const project of projects) {
      const existing = await tx.project.findFirst({ where: { title: project.title } });
      if (existing) {
        await tx.project.update({ where: { id: existing.id }, data: project });
      } else {
        await tx.project.create({ data: project });
      }
    }

    for (const meta of jobTagMeta) {
      await tx.tagMeta.upsert({
        where: { kind_name: { kind: "JOB", name: meta.name } },
        create: { ...meta, kind: "JOB" },
        update: { ...meta, kind: "JOB" },
      });
    }
    for (const job of jobOffers) {
      const existing = await tx.jobOffer.findFirst({ where: { title: job.title } });
      if (existing) {
        await tx.jobOffer.update({ where: { id: existing.id }, data: job });
      } else {
        await tx.jobOffer.create({ data: job });
      }
    }

    for (const post of blogPosts) {
      await tx.blogPost.upsert({
        where: { slug: post.slug },
        create: post,
        update: post,
      });
    }

    for (const testimonial of [...testimonialsHome, ...testimonialsAbout]) {
      const existing = await tx.testimonial.findFirst({
        where: { author: testimonial.author, context: testimonial.context },
      });
      if (existing) {
        await tx.testimonial.update({ where: { id: existing.id }, data: testimonial });
      } else {
        await tx.testimonial.create({ data: testimonial });
      }
    }
  });

  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
