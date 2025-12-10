import { Request, Response } from "express";
import db from "../db";

const post = async (request: Request, response: Response) => {
  try {
    const { id } = await db.service.create({
      data: {
        budgetId: request.body.budget_id,
        vehicleId: request.body.vehicle_id,
        value: request.body.value,
        description: request.body.description
      }
    })
    await db.budget.update({
      where: {
        id: request.body.budget_id
      },
      data: {
        value: {
          increment: request.body.value
        }
      }
    })

    response.status(201).json({ id })
  } catch (error) {
    response.status(500).json(error)
  }
}

const list = async (_request: Request, response: Response) => {
  try {
    const services = await db.service.findMany()
    response.status(200).json(services)
  } catch (error) {
    response.status(500).json(error)
  }
}

const byBudgetID = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    const services = await db.service.findMany({
      where: {
        budgetId: +id
      }
    })
    response.status(200).json(services)
  } catch (error) {
    response.status(500).json(error)
  }
}

const remove = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    const { value, budgetId } = await db.service.findUniqueOrThrow({ where: { id: parseInt(id) } })
    await db.service.delete({ where: { id: parseInt(id) } })
    await db.budget.update({
      where: {
        id: budgetId
      },
      data: {
        value: {
          decrement: value
        }
      }
    })
    response.status(204).json()
  } catch (error) {
    response.status(500).json(error)
  }
}

export default {
  post,
  list,
  remove,
  byBudgetID
}
