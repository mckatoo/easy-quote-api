"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const budgetController_1 = __importDefault(require("../controllers/budgetController"));
const budgetRoutes = (0, express_1.Router)();
budgetRoutes.post('', budgetController_1.default.post);
budgetRoutes.get('', budgetController_1.default.list);
budgetRoutes.get('/vehicle_id/:id', budgetController_1.default.getByVehicleID);
budgetRoutes.get('/id/:id', budgetController_1.default.getByID);
budgetRoutes.get('/client_name/:name', budgetController_1.default.findByName);
budgetRoutes.delete('/id/:id', budgetController_1.default.deleteByID);
budgetRoutes.patch('/id/:id', budgetController_1.default.toReceive);
exports.default = budgetRoutes;
