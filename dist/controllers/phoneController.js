"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const post = async (request, response) => {
    try {
        const exists = await db_1.default.phone.findFirst({
            where: {
                AND: [
                    { clientId: request.body.clientId },
                    { number: request.body.number }
                ]
            }
        });
        if (!!exists) {
            response.status(201).json({ id: exists.id });
        }
        else {
            const address = await db_1.default.phone.create({ data: request.body });
            response.status(201).json({ id: address.id });
        }
    }
    catch (error) {
        response.status(500).json(error);
    }
};
const deleteByID = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id)
            throw new Error('ID is required');
        await db_1.default.phone.delete({
            where: { id: +id },
        });
        response.status(204).json({});
    }
    catch (error) {
        response.status(500).json(error);
    }
};
const getByClientID = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id)
            throw new Error('ID is required');
        const addresses = await db_1.default.phone.findMany({
            where: {
                clientId: parseInt(id)
            }
        });
        response.status(200).json(addresses);
    }
    catch (error) {
        response.status(500).json(error);
    }
};
exports.default = {
    post,
    deleteByID,
    getByClientID
};
