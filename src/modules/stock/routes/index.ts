import { Router } from "express";
import { EnsureUserIsAuthenticated } from "../../user/routes/middlewares/EnsureUserIsAuthenticated";
import { GetAllProductsService } from "../services/GetAllProductsService";

export const stockRoutes = Router();

stockRoutes.use(EnsureUserIsAuthenticated);

stockRoutes.get("/", async (request, response) => {

	const GetAllProducts = new GetAllProductsService();
	const productsInStock = await GetAllProducts.execute()
	return response.status(200).json(productsInStock);
});