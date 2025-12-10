import request from "supertest"
import api from "../src"
import db from "../src/db"
import faker from "./faker"

describe("Client", () => {
  test("Create new client", async () => {
    const body = { name: faker.person.fullName() }
    const response = await request(api)
      .post('/client')
      .send(body)
    const createdClient = await db.client.findFirst({ where: { id: response.body.id }, select: { id: true, name: true } })

    expect(response.status).toEqual(201)
    expect(createdClient).toEqual({ id: response.body.id, ...body })
  })

  test("Return id of created client", async () => {
    const body = { name: faker.person.fullName() }
    const response = await request(api)
      .post('/client')
      .send(body)

    expect(response.body.id).toBeGreaterThan(0)
  })

  test("Get client by id", async () => {
    const expected = {
      name: faker.person.fullName(),
      rg: null,
      cpf: null,
      cnpj: null,
      addresses: [{
        street: faker.location.street(),
        number: faker.location.buildingNumber(),
        district: faker.location.county(),
        city: faker.location.city(),
        cep: faker.location.zipCode(),
        uf: faker.location.state({ abbreviated: true }),
      }],
      phones: [{ number: faker.phone.number() }],
    }
    const createdClient = await db.client.create({
      data: {
        name: expected.name,
        cpf: expected.cpf,
        phones: {
          createMany: {
            data: expected.phones.map(phone => ({ number: phone.number }))
          }
        },
        addresses: {
          createMany: {
            data: expected.addresses.map(address => ({
              street: address.street,
              number: address.number,
              uf: address.uf,
              cep: address.cep,
              city: address.city,
              district: address.district
            }))
          }
        },
      }
    })
    const response = await request(api)
      .get(`/client/id/${createdClient.id}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ id: createdClient.id, ...expected })
  })

  test("Not should create a duplicated client", async () => {
    const body = { name: faker.person.fullName() }
    await db.client.create({ data: body })
    const response = await request(api)
      .post('/client')
      .send(body)

    expect(response.status).toBe(500)
  })
})
