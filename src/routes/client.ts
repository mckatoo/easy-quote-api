import { Router } from "express"
import clientController from "../controllers/clientController"

const clientRoutes: Router = Router()
clientRoutes.post('', clientController.post)
clientRoutes.get('', clientController.list)
clientRoutes.delete('/id/:id', clientController.destroy)
clientRoutes.put('/id/:id', clientController.update)
clientRoutes.get('/id/:id', clientController.getByID)
clientRoutes.get('/name/:name', clientController.findByName)

export default clientRoutes
