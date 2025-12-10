"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicleController_1 = __importDefault(require("../controllers/vehicleController"));
const vehicleRoutes = (0, express_1.Router)();
vehicleRoutes.post('', vehicleController_1.default.post);
vehicleRoutes.get('/client_id/:id', vehicleController_1.default.getByClientID);
vehicleRoutes.delete('/id/:id', vehicleController_1.default.destroy);
vehicleRoutes.put('/id/:id', vehicleController_1.default.update);
vehicleRoutes.get('/id/:id', vehicleController_1.default.getByID);
exports.default = vehicleRoutes;
