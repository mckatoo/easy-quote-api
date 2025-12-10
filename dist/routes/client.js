"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientController_1 = __importDefault(require("../controllers/clientController"));
const clientRoutes = (0, express_1.Router)();
clientRoutes.post('', clientController_1.default.post);
clientRoutes.get('', clientController_1.default.list);
clientRoutes.delete('/id/:id', clientController_1.default.destroy);
clientRoutes.put('/id/:id', clientController_1.default.update);
clientRoutes.get('/id/:id', clientController_1.default.getByID);
clientRoutes.get('/name/:name', clientController_1.default.findByName);
exports.default = clientRoutes;
