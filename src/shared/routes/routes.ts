import { Router } from "express";
import { movimentationNatureRoutes } from "../../modules/movimentationNature";
import { productRoutes } from "../../modules/product/routes";
import { loginRoutes } from "../../modules/session/routes";
import { userPrivateRoutes, userRoutes } from "../../modules/user/routes/";

export const routes = Router();

routes.use("/users", userRoutes, userPrivateRoutes);
routes.use("/products", productRoutes);
routes.use("/authenticate", loginRoutes);
routes.use("/movimentationNature", movimentationNatureRoutes);

