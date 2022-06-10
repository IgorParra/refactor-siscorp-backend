import { Router } from "express";
import { productRoutes } from "../../modules/product/routes";
import { loginRoutes } from "../../modules/session/routes";
import { stockRoutes } from "../../modules/stock/routes/index";
import { userPrivateRoutes, userRoutes } from "../../modules/user/routes/";

export const routes = Router();

routes.use("/users", userRoutes, userPrivateRoutes);
routes.use("/products", productRoutes);
routes.use("/authenticate", loginRoutes);
routes.use("/stock", stockRoutes);

