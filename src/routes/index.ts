import { Router } from 'express'
import addressRoutes from './address'
import budgetRoutes from './budget'
import clientRoutes from './client'
import phoneRoutes from './phone'
import serviceRoutes from './service'
import vehicleRoutes from './vehicle'

const routes: Router = Router()

routes.use('/budget', budgetRoutes)
routes.use('/client', clientRoutes)
routes.use('/vehicle', vehicleRoutes)
routes.use('/service', serviceRoutes)
routes.use('/address', addressRoutes)
routes.use('/phone', phoneRoutes)

export default routes
