import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function makePrismaClient() {
  return new PrismaClient({log: ['error', 'info', 'warn']});
}

export const prisma = globalForPrisma.prisma || makePrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;