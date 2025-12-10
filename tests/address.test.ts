import request from "supertest";
import api from "../src";
import db from "../src/db";
import { Address } from "../src/generated/prisma/client";
import faker from "./faker";

describe("Address", () => {
  test("Create address", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const body: Omit<Address, 'id'> & { clientId: number } = {
      number: faker.number.int({ min: 100, max: 400 }).toString(),
      street: faker.location.street(),
      uf: faker.location.state({ abbreviated: true }),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      district: faker.lorem.sentence({ min: 7, max: 20 }),
      clientId: client.id
    }
    const response = await request(api)
      .post('/address')
      .send(body)
    const createdAddress = await db.address.findFirst({
      where: { id: response.body.id },
    })

    expect(response.status).toEqual(201)
    expect(createdAddress).toEqual({ id: response.body.id, ...body })
  })

  test("Remove address", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const address = await db.address.create({
      data: {
        number: faker.number.int({ min: 100, max: 400 }).toString(),
        street: faker.location.street(),
        uf: faker.location.state({ abbreviated: true }),
        cep: faker.location.zipCode(),
        city: faker.location.city(),
        district: faker.lorem.sentence({ min: 7, max: 20 }),
        clientId: client.id
      }
    })
    expect(
      await db.address.findUnique({ where: { id: address.id } })
    ).toEqual(address)

    const response = await request(api)
      .delete(`/address/id/${address.id}`)
      .send()

    expect(response.status).toBe(204)
  })

  test('Get addresses by clientId', async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const addresses = faker.helpers.multiple(() => ({
      number: faker.number.int({ min: 100, max: 400 }).toString(),
      street: faker.location.street(),
      uf: faker.location.state({ abbreviated: true }),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      district: faker.lorem.sentence({ min: 7, max: 20 }),
      clientId: client.id
    }), { count: 3 })
    await db.address.createMany({
      data: addresses
    })

    const response = await request(api)
      .get(`/address/client_id/${client.id}`)
      .send()
    const response_without_id = response.body.map((address: any) => {
      const { id, ...rest } = address
      return rest
    })

    expect(response.status).toBe(200)
    expect(response_without_id).toEqual(addresses)
  })

  test("Should not save duplicated address for same client", async () => {
    const client = await db.client.create({
      data: {
        name: faker.person.fullName()
      }
    })
    const body: Omit<Address, 'id'> & { clientId: number } = {
      number: faker.number.int({ min: 100, max: 400 }).toString(),
      street: faker.location.street(),
      uf: faker.location.state({ abbreviated: true }),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      district: faker.lorem.sentence({ min: 7, max: 20 }),
      clientId: client.id
    }
    await db.address.create({ data: body })
    const response = await request(api)
      .post('/address')
      .send(body)
    const address = await db.address.findMany({
      where: {
        AND: [
          { cep: body.cep },
          { number: body.number }
        ]
      }
    })

    expect(response.status).toBe(201)
    expect(address.length).toBe(1)
  })
})
