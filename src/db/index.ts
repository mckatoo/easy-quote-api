import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { DATABASE_URL } from "../envs";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaBetterSqlite3({ url: DATABASE_URL });
const client = globalForPrisma.prisma || new PrismaClient({
  adapter
});

globalForPrisma.prisma = client;

export default client;
