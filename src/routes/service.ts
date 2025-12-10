import { Router } from "express"
import serviceController from "../controllers/serviceController"

const serviceRoutes: Router = Router()
serviceRoutes.post('', serviceController.post)
serviceRoutes.get('', serviceController.list)
serviceRoutes.get('/budget_id/:id', serviceController.byBudgetID)
serviceRoutes.delete('/id/:id', serviceController.remove)

export default serviceRoutes
