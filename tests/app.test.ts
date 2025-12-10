import request from "supertest"
import api from "../src"

describe("App", () => {
  test("Verifica versão", async () => {
    const version = process.env.npm_package_version

    const response = await request(api)
      .get('/')
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.version).toEqual(version)
  })
})
