import { Router } from 'express'

import { movimentationNatureRoutes } from '../../modules/movimentationNature/routes'
import { productRoutes } from '../../modules/product/routes'
import { loginRoutes } from '../../modules/session/routes'
import { stockRoutes } from '../../modules/stock/routes/index'
import { userPrivateRoutes, userRoutes } from '../../modules/user/routes/'
import { financialRoutes } from './../../modules/financial/routes/index'

export const routes = Router();

routes.use("/users", userRoutes, userPrivateRoutes);
routes.use("/products", productRoutes);
routes.use("/authenticate", loginRoutes);
routes.use("/stock", stockRoutes);
routes.use("/movimentation-nature", movimentationNatureRoutes);
routes.use("/financial", financialRoutes);
