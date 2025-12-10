import { Router } from "express"
import vehicleController from "../controllers/vehicleController"

const vehicleRoutes: Router = Router()
vehicleRoutes.post('', vehicleController.post)
vehicleRoutes.get('/client_id/:id', vehicleController.getByClientID)
vehicleRoutes.delete('/id/:id', vehicleController.destroy)
vehicleRoutes.put('/id/:id', vehicleController.update)
vehicleRoutes.get('/id/:id', vehicleController.getByID)

export default vehicleRoutes
