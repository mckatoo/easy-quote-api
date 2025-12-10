"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const post = async (request, response) => {
    try {
        const { id } = await db_1.default.service.create({
            data: {
                budgetId: request.body.budget_id,
                vehicleId: request.body.vehicle_id,
                value: request.body.value,
                description: request.body.description
            }
        });
        await db_1.default.budget.update({
            where: {
                id: request.body.budget_id
            },
            data: {
                value: {
                    increment: request.body.value
                }
            }
        });
        response.status(201).json({ id });
    }
    catch (error) {
        response.status(500).json(error);
    }
};
const list = async (_request, response) => {
    try {
        const services = await db_1.default.service.findMany();
        response.status(200).json(services);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
const byBudgetID = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id)
            throw new Error('ID is required');
        const services = await db_1.default.service.findMany({
            where: {
                budgetId: +id
            }
        });
        response.status(200).json(services);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
const remove = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id)
            throw new Error('ID is required');
        const { value, budgetId } = await db_1.default.service.findUniqueOrThrow({ where: { id: parseInt(id) } });
        await db_1.default.service.delete({ where: { id: parseInt(id) } });
        await db_1.default.budget.update({
            where: {
                id: budgetId
            },
            data: {
                value: {
                    decrement: value
                }
            }
        });
        response.status(204).json();
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.default = {
    post,
    list,
    remove,
    byBudgetID
};
