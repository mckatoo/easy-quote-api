"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const api = (0, express_1.default)();
const isDev = (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test');
const version = isDev
    ? process.env.npm_package_version
    : (0, fs_1.readFileSync)(path_1.default.join(__dirname, 'version.txt')).toString().trim();
if (!version) {
    throw new Error('Version not found. Please ensure version.txt exists or set npm_package_version in your environment.');
}
api.use(express_1.default.json());
api.use((0, cors_1.default)());
if (!!process.env.SECRET_KEY && !isDev) {
    api.use((req, res, next) => {
        if (req.headers['x-app-token'] !== process.env.SECRET_KEY) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }
        next();
    });
}
api.use(express_1.default.urlencoded({ extended: true }));
api.use(routes_1.default);
api.get('/', (_request, response) => {
    response.json({ version });
});
exports.default = api;
