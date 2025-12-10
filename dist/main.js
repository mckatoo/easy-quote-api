"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'http://localhost';
_1.default.listen(PORT, () => {
    console.log(`
    API iniciada em: ${HOST}:${PORT}
    Pressione CTRL+C para sair.
  `);
});
