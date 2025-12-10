"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const post = async (request, response) => {
    try {
        const { client_id, ...body } = request.body;
        const vehicle = await db_1.default.vehicle.create({
            data: {
                ...body,
                clientId: parseInt(client_id)
            }
        });
        response.status(201).json({ id: vehicle.id });
    }
    catch (error) {
        console.log('error>>>', error);
        response.status(500).json(error);
    }
};
const getByClientID = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id)
            throw new Error('ID is required');
        const vehicles = await db_1.default.vehicle.findMany({
            where: {
                clientId: parseInt(id)
            }
        });
        response.status(200).json(vehicles);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
const destroy = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id)
            throw new Error('ID is required');
        await db_1.default.vehicle.delete({
            where: { id: parseInt(id) },
        });
        response.status(204).json({});
    }
    catch (error) {
        response.status(500).json(error);
    }
};
const update = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id)
            throw new Error('ID is required');
        await db_1.default.vehicle.update({
            data: request.body,
            where: { id: parseInt(id) },
        });
        response.status(204).json({});
    }
    catch (error) {
        response.status(500).json(error);
    }
};
const getByID = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id)
            throw new Error('ID is required');
        const vehicle = await db_1.default.vehicle.findUnique({
            where: { id: parseInt(id) },
            include: {
                client: true,
                services: true,
                budgets: true
            },
        });
        response.status(200).json(vehicle);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.default = {
    post,
    getByClientID,
    destroy,
    update,
    getByID
};
