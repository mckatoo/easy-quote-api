import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: isDev ? 'file:./dev.db' : "file:./prod.db"
  },
});
