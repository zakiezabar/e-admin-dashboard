import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(search: string, offset: number) {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: { contains: search, mode: 'insensitive' } },
        { name: { contains: search, mode: 'insensitive' } },
        // { username: { contains: search, mode: 'insensitive' } }
      ]
    },
    skip: offset,
    take: 10
  });

  const newOffset = offset + users.length;
  return { users, newOffset };
}

export { prisma as db };

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = db;