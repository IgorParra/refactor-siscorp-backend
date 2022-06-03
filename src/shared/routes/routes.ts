import { Router } from "express";
import { productRoutes } from "../../modules/user/routes/product";
import { userRoutes } from "../../modules/user/routes/";
import { userMiddleRoutes } from "../../modules/user/routes/";
import { loginRoutes } from "../../modules/user/routes/login";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/users", userMiddleRoutes);
routes.use("/products" , productRoutes);
routes.use("/authenticate" , loginRoutes);
