"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_better_sqlite3_1 = require("@prisma/adapter-better-sqlite3");
const client_1 = require("../generated/prisma/client");
const envs_1 = require("../envs");
const globalForPrisma = global;
const adapter = new adapter_better_sqlite3_1.PrismaBetterSqlite3({ url: envs_1.DATABASE_URL });
const client = globalForPrisma.prisma || new client_1.PrismaClient({
    adapter
});
globalForPrisma.prisma = client;
exports.default = client;
