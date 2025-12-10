import { Request, Response } from "express";
import db from "../db";

const post = async (request: Request, response: Response) => {
  try {
    const exists = await db.phone.findFirst({
      where: {
        AND: [
          { clientId: request.body.clientId },
          { number: request.body.number }
        ]
      }
    })
    if (!!exists) {
      response.status(201).json({ id: exists.id })
    } else {
      const address = await db.phone.create({ data: request.body })
      response.status(201).json({ id: address.id })
    }
  } catch (error) {
    response.status(500).json(error)
  }
}

const deleteByID = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    await db.phone.delete({
      where: { id: +id },
    })
    response.status(204).json({})
  } catch (error) {
    response.status(500).json(error)
  }
}

const getByClientID = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    const addresses = await db.phone.findMany({
      where: {
        clientId: parseInt(id)
      }
    })
    response.status(200).json(addresses)
  } catch (error) {
    response.status(500).json(error)
  }
}

export default {
  post,
  deleteByID,
  getByClientID
}
