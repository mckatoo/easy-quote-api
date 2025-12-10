"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressController_1 = __importDefault(require("../controllers/addressController"));
const addressRoutes = (0, express_1.Router)();
addressRoutes.post('', addressController_1.default.post);
addressRoutes.delete('/id/:id', addressController_1.default.deleteByID);
addressRoutes.get('/client_id/:id', addressController_1.default.getByClientID);
exports.default = addressRoutes;
