import { PrismaClient } from "@prisma/client";
import { seedTaxonomy } from "./taxonomy.seed";
import { seedClassified } from "./classifieds.seed";
import { seedImages } from "./images.seed";

const prisma = new PrismaClient();

async function main() {
     await prisma.$executeRaw`TRUNCATE TABLE "makes", "model_variants" RESTART IDENTITY CASCADE`;
     await seedTaxonomy(prisma)
    await seedClassified(prisma);
    await seedImages(prisma)
}

main().catch((e) => {
    throw e;
}).finally(async () => {
    await prisma.$disconnect();
});

//npx prisma db seed
