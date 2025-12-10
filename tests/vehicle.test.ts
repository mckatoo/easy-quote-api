import { faker } from "@faker-js/faker"
import request from "supertest"
import api from "../src"
import db from "../src/db"
import { fakerVehicle } from "./faker"


describe("Client", () => {
  test("Create new vehicle", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const { client_id, ...body } = {
      ...fakerVehicle(),
      client_id: client.id
    }
    const response = await request(api)
      .post('/vehicle')
      .send({ ...body, client_id })
    const createdVehicle = await db.vehicle.findFirst({
      where: {
        id: response.body.id
      }
    })

    expect(response.status).toEqual(201)
    expect(createdVehicle).toEqual({
      id: response.body.id,
      ...body,
      clientId: client_id
    })
  })

  test("Get vehicle by client id", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const vehicle = await db.vehicle.create({
      data: {
        ...fakerVehicle(),
        clientId: client.id
      }
    })
    const response = await request(api)
      .get(`/vehicle/client_id/${client.id}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual([vehicle])
  })

  test("Delete vehicle", async () => {
    const client = await db.client.create({
      data: {
        name: `Novo Cliente ${Date.now()}`
      }
    })
    const vehicle = await db.vehicle.create({
      data: {
        ...fakerVehicle(),
        clientId: client.id
      }
    })
    const response = await request(api)
      .delete(`/vehicle/id/${vehicle.id}`)
      .send()
    const deletedVehicle = await db.vehicle.findFirst({ where: { id: vehicle.id } })

    expect(response.status).toEqual(204)
    expect(deletedVehicle).toBeNull()
  })

  test("Get vehicle by id", async () => {
    const client = await db.client.create({
      data: {
        name: `Novo Cliente ${Date.now()}`
      }
    })
    const vehicle = await db.vehicle.create({
      data: {
        ...fakerVehicle(),
        clientId: client.id
      }
    })
    const response = await request(api)
      .get(`/vehicle/id/${vehicle.id}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      ...vehicle,
      services: [],
      budgets: [],
      client
    })
  })
})
