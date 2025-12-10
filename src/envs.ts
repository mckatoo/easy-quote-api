import { configDotenv } from "dotenv";

configDotenv();

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
export const IS_DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
export const DATABASE_URL = IS_DEV ? 'file:./dev.db' : `file:./prod.db`;

if (!ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY not found');
}