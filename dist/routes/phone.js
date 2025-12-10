"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const phoneController_1 = __importDefault(require("../controllers/phoneController"));
const phoneRoutes = (0, express_1.Router)();
phoneRoutes.post('', phoneController_1.default.post);
phoneRoutes.delete('/id/:id', phoneController_1.default.deleteByID);
phoneRoutes.get('/client_id/:id', phoneController_1.default.getByClientID);
exports.default = phoneRoutes;
