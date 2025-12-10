import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";

export default async () => {
  if (!existsSync(path.join(__dirname, "../dev.db"))) {
    console.log(`Using ${process.env.NODE_ENV} database`);
    execSync("run-s prisma:push");
  }
  if (!existsSync(path.join(__dirname, "generated", "prisma"))) {
    console.log(`Generating prisma client`);
    execSync("run-s prisma:generate");
  }
};