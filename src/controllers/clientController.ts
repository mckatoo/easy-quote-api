import { Request, Response } from "express";
import db from "../db";

const post = async (request: Request, response: Response) => {
  try {
    const exists = await db.client.findFirst({
      where: {
        AND: [
          { name: request.body.name },
          { cpf: request.body.cpf },
          { cnpj: request.body.cnpj },
          { rg: request.body.rg }
        ]
      }
    })
    if (!!exists) throw new Error("Client already exists");

    const client = await db.client.create({ data: request.body })
    response.status(201).json({ id: client.id })
  } catch (error) {
    response.status(500).json(error)
  }
}

const list = async (request: Request, response: Response) => {
  const getAll = (request.query.take === '-1' && request.query.cursor === '-1')
  try {
    const take = getAll ? undefined : +(request.query.take || 20)
    const cursor = getAll ? undefined : +(request.query.cursor || 0)
    const clients = await db.client.findMany({
      take,
      skip: (!cursor || cursor === 0) ? 0 : 1,
      cursor: !cursor ? undefined : {
        id: cursor
      },
      orderBy: {
        id: "desc"
      }
    })
    response.status(200).json(clients)
  } catch (error) {
    response.status(500).json(error)
  }
}

const findByName = async (request: Request, response: Response) => {
  try {
    const { name } = request.params
    const clients = await db.client.findMany({
      where: {
        name: {
          contains: name
        }
      }
    })
    response.status(200).json(clients)
  } catch (error) {
    response.status(500).json(error)
  }
}

const destroy = async (request: Request, response: Response) => {
  try {
    const { id } = request.params
    if (!id) throw new Error('ID is required')
    await db.client.delete({
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
    await db.client.update({
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
    const body = await db.client.findUnique({
      where: { id: parseInt(id) },
      include: {
        addresses: {
          select: {
            district: true,
            city: true,
            cep: true,
            uf: true,
            number: true,
            street: true,
          }
        },
        phones: {
          select: {
            number: true
          }
        },
      }
    })
    response.status(200).json(body)
  } catch (error) {
    response.status(500).json(error)
  }
}

export default {
  post,
  list,
  destroy,
  update,
  getByID,
  findByName
}
