import { Router } from "express";
import { EnsureUserIsAuthenticated } from "../../../shared/routes/middlewares/EnsureUserIsAuthenticated";
import { FindProductStockServices } from "../services/FindProductStockServices";
import { GetAllProductsInStockService } from "../services/GetAllProductsService";
import { MovimentStockService } from "../services/StockService";

export const stockRoutes = Router();

stockRoutes.use(EnsureUserIsAuthenticated);

stockRoutes.get("/:barcode", async (request, response) => {
	const { barcode } = request.params;

	const findStockServices = new FindProductStockServices();
	const productList = await findStockServices.execute(barcode);

	return response.json(productList);
});

stockRoutes.post("/", async (request, response) => {
	const params = request.body;

	const movimentStock = new MovimentStockService();
	const result = await movimentStock.execute(params);

	return response.json(result);
});

stockRoutes.get("/", async (request, response) => {
	const getAllProducts = new GetAllProductsInStockService();
	const productsInStock = await getAllProducts.execute();
	return response.status(200).json(productsInStock);
});
