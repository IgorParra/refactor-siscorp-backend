import { Router } from "express";
import { EnsureUserIsAuthenticated } from "../../user/routes/middlewares/EnsureUserIsAuthenticated";
import { CreateProductService } from "../services/CreateProductService";

export const productRoutes = Router();

productRoutes.use(EnsureUserIsAuthenticated);

productRoutes.post("/", async (request, response) => {
	const product = request.body;

	const productService = new CreateProductService();

	const newProduct = await productService.execute(product);

	return response.json(newProduct);
});

