import { Router } from "express";
import { EnsureUserIsAuthenticated } from "../../../shared/routes/middlewares/ensureUserIsAuthenticated";
import { FindProductStockServices } from "../services/FindProductStockServices";
import { GetAllProductsInStockService } from "../services/GetAllProductsService";
import { StockService } from "../services/StockService";

export const stockRoutes = Router();

stockRoutes.use(EnsureUserIsAuthenticated);

stockRoutes.get("/:barcode", async (request, response) => {
	const { barcode } = request.params;

	const findStockServices = new FindProductStockServices();
	const listProductStockFindBarcode = await findStockServices.execute(barcode);

	console.log(listProductStockFindBarcode);
	return response.json(listProductStockFindBarcode);
});

stockRoutes.post("/", async (request, response) => {
	const stock = request.body;

	const stockService = new StockService();
	const newStock = await stockService.execute(stock);

	return response.json(newStock);
});

stockRoutes.get("/", async (request, response) => {
	const getAllProducts = new GetAllProductsInStockService();
	const productsInStock = await getAllProducts.execute();
	return response.status(200).json(productsInStock);
});
