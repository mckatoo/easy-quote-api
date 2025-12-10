import { copyFileSync, existsSync, writeFileSync } from "fs";
import path from "path";

const dbFile = path.join(__dirname, 'prod.db')

if (!existsSync(dbFile)) {
  throw new Error('Database not found. Please run prisma:push first.');
}
copyFileSync(dbFile, path.join(__dirname, 'dist', 'prod.db'));

const version = process.env.npm_package_version;
if (!version) {
  throw new Error('Version not found. Please verify that package.json has a version property.');
}
writeFileSync('./dist/version.txt', version);