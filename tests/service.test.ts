import request from "supertest"
import api from "../src"
import db from "../src/db"
import faker, { fakerVehicle } from "./faker"

async function mock() {
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
  const budget = await db.budget.create({
    data: {
      date: new Date(),
      clientId: client.id,
      vehicleId: vehicle.id,
      value: 10000
    }
  })

  return { budget, vehicle, client }
}

describe("Service", () => {
  test("Create new service with value", async () => {
    const { vehicle, budget } = await mock()
    const body = {
      description: "New Service",
      value: 30000,
      vehicle_id: vehicle.id,
      budget_id: budget.id
    }
    const response = await request(api)
      .post('/service')
      .send(body)
    const createdService = await db.service.findUnique({ where: { id: response.body.id } })

    expect(response.status).toEqual(201)
    expect(createdService).toEqual({
      id: createdService?.id,
      value: body.value,
      description: body.description,
      vehicleId: body.vehicle_id,
      budgetId: body.budget_id
    })
  })

  test("Increase budget value when add the service", async () => {
    const { vehicle, budget } = await mock()
    const body = {
      description: "New Service",
      value: 30000,
      vehicle_id: vehicle.id,
      budget_id: budget.id
    }
    await request(api)
      .post('/service')
      .send(body)
    const updatedBudget = await db.budget.findUnique({
      where: {
        id: budget.id
      }
    })

    expect(updatedBudget?.value).toEqual(body.value + budget.value)
  })

  test("Remove the service", async () => {
    const { vehicle, budget } = await mock()
    const service = await db.service.create({
      data: {
        value: 15000,
        description: 'service test',
        budgetId: budget.id,
        vehicleId: vehicle.id
      }
    })
    const response = await request(api)
      .delete(`/service/id/${service.id}`)
      .send()
    const deleted = await db.service.findUnique({ where: { id: service.id } })

    expect(response.status).toBe(204)
    expect(deleted).toBeNull()
  })


  test("Decrease budget value when remove the service", async () => {
    const { vehicle, budget } = await mock()
    const service = await db.service.create({
      data: {
        value: 15000,
        description: 'service test',
        budgetId: budget.id,
        vehicleId: vehicle.id
      }
    })
    const response = await request(api)
      .delete(`/service/id/${service.id}`)
      .send()
    const updatedBudget = await db.budget.findUnique({
      where: {
        id: budget.id
      }
    })

    expect(response.status).toBe(204)
    expect(updatedBudget?.value).toEqual(budget.value - service.value)
  })
})
