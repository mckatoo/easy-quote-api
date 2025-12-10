import { Router } from "express"
import addressController from "../controllers/addressController"

const addressRoutes: Router = Router()
addressRoutes.post('', addressController.post)
addressRoutes.delete('/id/:id', addressController.deleteByID)
addressRoutes.get('/client_id/:id', addressController.getByClientID)

export default addressRoutes
