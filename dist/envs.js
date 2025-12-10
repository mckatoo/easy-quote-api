"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.IS_DEV = exports.ENCRYPTION_KEY = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
exports.ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
exports.IS_DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
exports.DATABASE_URL = exports.IS_DEV ? 'file:./dev.db' : `file:./prod.db`;
if (!exports.ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY not found');
}
