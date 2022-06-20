import { Router } from "express";
import { EnsureUserIsAuthenticated } from "../../../shared/routes/middlewares/EnsureUserIsAuthenticated";
import { CreateProductService } from "../services/CreateProductService";
import { UpdateProductService } from "../services/UpdateProductService";

export const productRoutes = Router();

productRoutes.use(EnsureUserIsAuthenticated);

productRoutes.post("/", async (request, response) => {
	const product = request.body;

	const createProduct = new CreateProductService();

	const newProduct = await createProduct.execute(product);

	return response.json(newProduct);
});

productRoutes.put("/", async (request, response) => {
	const { barcode, name, brand, description, complementation } = request.body;

	const updateProduct = new UpdateProductService();

	const productUpdate = await updateProduct.execute({
		barcode,
		name,
		brand,
		description,
		complementation,
	});

	return response.json(productUpdate);
});
