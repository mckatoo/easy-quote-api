import { Router } from "express"
import budgetController from "../controllers/budgetController"

const budgetRoutes: Router = Router()
budgetRoutes.post('', budgetController.post)
budgetRoutes.get('', budgetController.list)
budgetRoutes.get('/vehicle_id/:id', budgetController.getByVehicleID)
budgetRoutes.get('/id/:id', budgetController.getByID)
budgetRoutes.get('/client_name/:name', budgetController.findByName)
budgetRoutes.delete('/id/:id', budgetController.deleteByID)
budgetRoutes.patch('/id/:id', budgetController.toReceive)

export default budgetRoutes
