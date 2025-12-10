import { fakerPT_BR as faker } from "@faker-js/faker"

export default faker

export function fakerYear() {
  return faker.date.between({
    from: new Date(2000, 0, 1),
    to: Date.now()
  }).getFullYear()
}

export function fakerVehicle() {
  return {
    brand: faker.vehicle.manufacturer(),
    model: faker.vehicle.model(),
    plate: faker.vehicle.vrm(),
    year: fakerYear(),
  }
}

