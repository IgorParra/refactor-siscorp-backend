import { Router } from "express";
import { userPrivateRoutes } from "modules/user/routes";
import { EnsureUserIsAuthenticated } from "../../user/routes/middlewares/EnsureUserIsAuthenticated";
import { StockService } from "../services/StockService";


export const stockRoutes = Router();


stockRoutes.use(EnsureUserIsAuthenticated);

stockRoutes.get("/", async (request, response) => {
	return response.json("teste");
});

stockRoutes.post("/", async (request, response) => {
	const moviment = request.body;

	const movimentService = new StockService();
	const newMoviment = await movimentService.execute(moviment);

	return response.json(newMoviment);

});