import { Router } from "express";
import { userPrivateRoutes } from "modules/user/routes";
import { EnsureUserIsAuthenticated } from "../../user/routes/middlewares/EnsureUserIsAuthenticated";
import { FindStockServices } from "../services/FindStockServices";
import { GetAllProductsService } from "../services/GetAllProductsService";
import { StockService } from "../services/StockService";


export const stockRoutes = Router();


stockRoutes.use(EnsureUserIsAuthenticated);

stockRoutes.get("/:barcode", async (request, response) => {
	const {barcode} = request.params;

	const findStockServices = new FindStockServices();
	const listProductStockFindBarcode = await findStockServices.execute(barcode)

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

	const GetAllProducts = new GetAllProductsService();
	const productsInStock = await GetAllProducts.execute()
	return response.status(200).json(productsInStock);
});