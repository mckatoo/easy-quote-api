import { Router } from "express"
import phoneController from "../controllers/phoneController"

const phoneRoutes: Router = Router()
phoneRoutes.post('', phoneController.post)
phoneRoutes.delete('/id/:id', phoneController.deleteByID)
phoneRoutes.get('/client_id/:id', phoneController.getByClientID)

export default phoneRoutes
