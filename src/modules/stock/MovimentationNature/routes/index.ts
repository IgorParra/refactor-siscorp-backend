import { Router } from "express";
import { EnsureUserIsAuthenticated } from "../../../user/routes/middlewares/EnsureUserIsAuthenticated";
import { UpdateMovimentationNatureDescription } from "../services/UpdateMovimentationNatureDescription";

export const movimentationNatureRoutes = Router();

movimentationNatureRoutes.use(EnsureUserIsAuthenticated);

movimentationNatureRoutes.put("/movimentation-nature/:idToUpdate", async (request, response) => {

	const { id } = request.params;
	const { desc } = request.body;

	const movimentationNatureService = new UpdateMovimentationNatureDescription();

	const movimentationNatureUpdate = await movimentationNatureService.execute(id, desc);

	return response.json(movimentationNatureUpdate);
});
