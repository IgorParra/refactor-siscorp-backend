import { Router } from "express";
import { EnsureUserIsAuthenticated } from "../../../shared/routes/middlewares/EnsureUserIsAuthenticated";
import { GetAllProductsInStockService } from "../services/GetAllProductsService";

export const stockRoutes = Router();

stockRoutes.use(EnsureUserIsAuthenticated);

stockRoutes.get("/", async (request, response) => {
	const getAllProducts = new GetAllProductsInStockService();
	const productsInStock = await getAllProducts.execute();
	return response.status(200).json(productsInStock);
});
