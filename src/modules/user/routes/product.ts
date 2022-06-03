import { Router } from "express";
import { CreateProductService } from "../services/product/CreateProductService";
import { Product } from "../entities/Product";
const authMiddleware = require("../middlewares/auth");


export const productRoutes = Router();

productRoutes.use(authMiddleware)

productRoutes.get("/", async (req, res)=>{

	return res.json("Teste de token");
}) 


productRoutes.post("/", async (req, res) => {
	const { barcode, name, brand, description, complementation } = req.body;

	const productService = new CreateProductService();

	const product = await productService.execute( {barcode, name, brand, description, complementation} );

	return res.json(product);
});
