import { Router } from "express";
import { Product } from "../entities/Product";
import { CreateProductService } from "../services/product/CreateProductService";



export const productRoutes = Router();

productRoutes.post("/", async (req, res) => {
	const { barcode, name, brand, description, complementation } = req.body;

	const productService = new CreateProductService();

	const product = await productService.execute( {barcode, name, brand, description, complementation} );

	return res.json(product);
});
