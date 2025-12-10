import { Request, Response } from "express";
import db from "../db";

export default {
  post: async (request: Request, response: Response) => {
    const { date } = request.body

    if (date.toString() === 'Invalid Date')
      throw new Error(date.toString());

    const { body } = request
    try {
      const budget = await db.budget.create({
        data: {
          clientId: body.client_id,
          vehicleId: body.vehicle_id,
          value: body.value,
          date,
        }
      })
      response.status(201).json({ id: budget.id })
    } catch (error) {
      response.status(500).json(error)
    }
  },
  list: async (request: Request, response: Response) => {
    try {
      const take = +(request.query.take || 20)
      const cursor = +(request.query.cursor || 0)
      const budgets = await db.budget.findMany({
        take,
        skip: cursor === 0 ? 0 : 1,
        cursor: !cursor ? undefined : {
          id: cursor
        },
        include: {
          client: true,
          vehicle: true,
          services: true
        },
        orderBy: {
          date: "desc"
        }
      })
      response.status(200).json(budgets)
    } catch (error) {
      response.status(500).json(error)
    }
  },
  findByName: async (request: Request, response: Response) => {
    try {
      const { name } = request.params
      const budgets = await db.budget.findMany({
        where: {
          client: {
            name: {
              contains: name
            }
          }
        },
        include: {
          client: true,
          vehicle: true,
          services: true
        },
        orderBy: {
          date: "desc"
        }
      })
      response.status(200).json(budgets)
    } catch (error) {
      response.status(500).json(error)
    }
  },
  getByVehicleID: async (request: Request, response: Response) => {
    try {
      const { id } = request.params
      if (!id) throw new Error('ID is required')
      const budget = await db.budget.findFirstOrThrow({
        where: {
          vehicleId: parseInt(id)
        },
        select: {
          services: true,
          date: true,
          id: true,
          value: true
        },
        orderBy: {
          date: "desc"
        }
      })
      response.status(200).json(budget)
    } catch (error) {
      response.status(500).json(error)
    }
  },
  getByID: async (request: Request, response: Response) => {
    try {
      const { id } = request.params
      if (!id) throw new Error('ID is required')
      const budget = await db.budget.findUniqueOrThrow({
        where: {
          id: parseInt(id)
        },
        select: {
          receivedIn: true,
          client: true,
          services: true,
          date: true,
          id: true,
          value: true
        },
      })
      response.status(200).json(budget)
    } catch (error) {
      response.status(500).json(error)
    }
  },
  deleteByID: async (request: Request, response: Response) => {
    try {
      const { id } = request.params
      if (!id) throw new Error('ID is required')
      await db.budget.delete({
        where: {
          id: parseInt(id)
        }
      })
      response.status(204).json()
    } catch (error) {
      response.status(500).json(error)
    }
  },
  toReceive: async (request: Request, response: Response) => {
    try {
      const { id } = request.params
      if (!id) throw new Error('ID is required')
      await db.budget.update({
        data: {
          receivedIn: new Date()
        },
        where: {
          id: parseInt(id)
        }
      })
      response.status(204).json()
    } catch (error) {
      response.status(500).json(error)
    }
  },
}
