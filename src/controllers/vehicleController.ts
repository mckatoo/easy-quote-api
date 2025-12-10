import { Request, Response } from "express";
import db from "../db";

const post = async (request: Request, response: Response) => {
  try {
    const { client_id, ...body } = request.body
    const vehicle = await db.vehicle.create({
      data: {
        ...body,
        clientId: parseInt(client_id)
      }
    })
    response.status(201).json({ id: vehicle.id })
  } catch (error) {
    console.log('error>>>', error)
    response.status(500).json(error)
  }
}

const getByClientID = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    const vehicles = await db.vehicle.findMany({
      where: {
        clientId: parseInt(id)
      }
    })
    response.status(200).json(vehicles)
  } catch (error) {
    response.status(500).json(error)
  }
}

const destroy = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    await db.vehicle.delete({
      where: { id: parseInt(id) },
    })
    response.status(204).json({})
  } catch (error) {
    response.status(500).json(error)
  }
}

const update = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    await db.vehicle.update({
      data: request.body,
      where: { id: parseInt(id) },
    })
    response.status(204).json({})
  } catch (error) {
    response.status(500).json(error)
  }
}

const getByID = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    const vehicle = await db.vehicle.findUnique({
      where: { id: parseInt(id) },
      include: {
        client: true,
        services: true,
        budgets: true
      },
    })
    response.status(200).json(vehicle)
  } catch (error) {
    response.status(500).json(error)
  }
}

export default {
  post,
  getByClientID,
  destroy,
  update,
  getByID
}
