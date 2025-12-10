import request from "supertest"
import api from "../src"
import db from "../src/db"
import faker, { fakerVehicle } from "./faker"


describe("Orçamento", () => {
  test("Create a new budget", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const vehicle = await db.vehicle.create({
      data: {
        clientId: client.id,
        ...fakerVehicle()
      }
    })

    const body = {
      client_id: client.id,
      date: faker.date.past({ years: 5 }),
      vehicle_id: vehicle.id,
      value: 40000
    }
    const response = await request(api)
      .post('/budget')
      .send(body)
    const createdBudget = await db.budget.findUnique({ where: { id: response.body.id } })

    expect(response.status).toEqual(201)
    expect(createdBudget).toStrictEqual({
      id: createdBudget?.id,
      date: body.date,
      receivedIn: null,
      value: body.value,
      clientId: client.id,
      vehicleId: vehicle.id
    })
  })

  test("Get budget by vehicle id", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const vehicle = await db.vehicle.create({
      data: {
        clientId: client.id,
        ...fakerVehicle()
      }
    })
    const budget = await db.budget.create({
      data: {
        clientId: client.id,
        vehicleId: vehicle.id,
        value: 30000,
      }
    })

    const response = await request(api)
      .get(`/budget/vehicle_id/${vehicle.id}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: budget.id,
      services: [],
      value: budget.value,
      date: budget.date.toISOString()
    })
  })

  test("Delete budget", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const vehicle = await db.vehicle.create({
      data: {
        clientId: client.id,
        ...fakerVehicle()
      }
    })

    const budget = await db.budget.create({
      data: {
        clientId: client.id,
        vehicleId: vehicle.id,
        value: 900000,
      }
    })

    const response = await request(api)
      .delete(`/budget/id/${budget.id}`)
      .send()

    expect(response.status).toBe(204)
  })

  test("Receive the payment", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const vehicle = await db.vehicle.create({
      data: {
        clientId: client.id,
        ...fakerVehicle()
      }
    })
    const budget = await db.budget.create({
      data: {
        clientId: client.id,
        vehicleId: vehicle.id,
        value: 900000,
      }
    })

    const response = await request(api)
      .patch(`/budget/id/${budget.id}`)
      .send()

    const receivedBudget = await db.budget.findUnique({
      where: { id: budget.id }
    })

    expect(response.status).toBe(204)
    expect(receivedBudget?.receivedIn?.getDate()).toBe((new Date()).getDate())
    expect(receivedBudget?.receivedIn?.getMonth()).toBe((new Date()).getMonth())
    expect(receivedBudget?.receivedIn?.getFullYear()).toBe((new Date()).getFullYear())
  })

  test("List all budgets", async () => {
    const response = await request(api)
      .get("/budget")
      .send()

    expect(response.status).toBe(200)
  })
})
