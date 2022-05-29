import { Router } from "express";
import { productRoutes } from "../../modules/user/routes/product";
import { userRoutes } from "../../modules/user/routes/";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products" , productRoutes);