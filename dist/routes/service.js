"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = __importDefault(require("../controllers/serviceController"));
const serviceRoutes = (0, express_1.Router)();
serviceRoutes.post('', serviceController_1.default.post);
serviceRoutes.get('', serviceController_1.default.list);
serviceRoutes.get('/budget_id/:id', serviceController_1.default.byBudgetID);
serviceRoutes.delete('/id/:id', serviceController_1.default.remove);
exports.default = serviceRoutes;
