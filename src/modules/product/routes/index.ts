import { UpdateProductService } from './services/UpdateProductService';
import { Router } from "express";
import { EnshureUserIsAuthenticated } from "../../user/routes/middlewares/EnsureUserIsAuthenticated";
import { CreateProductService } from "./services/CreateProductService";

export const productRoutes = Router();

productRoutes.use(EnshureUserIsAuthenticated);

productRoutes.post("/", async (request, response) => {
	const product = request.body;

	const productService = new CreateProductService();

	const newProduct = await productService.execute(product);

	return response.json(newProduct);
});

productRoutes.put("/", async (request, response) => {
	const { barcode, name, brand, description, complementation } = request.body;

	const productService = new UpdateProductService();

	const productUpdate = await productService.execute( barcode, name, brand, description, complementation );

	return response.json(productUpdate);
});
