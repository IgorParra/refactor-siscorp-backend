import { Router } from "express";
import { EnsureUserIsAuthenticated } from "../../../user/routes/middlewares/EnsureUserIsAuthenticated";
import { UpdateMovimentationNatureDescription } from "../services/UpdateMovimentationNatureDescription";

export const movimentationnatureRoutes = Router();

movimentationnatureRoutes.use(EnsureUserIsAuthenticated);

movimentationnatureRoutes.put("/movimentation-nature/:idToUpdate", async (req, res) => {

	const { id } = req.params;
	const { desc } = req.body;

	const movimentationnatureService = new UpdateMovimentationNatureDescription();

	const movimentationnatureUpdate = await movimentationnatureService.execute(id, desc);

	return res.json(movimentationnatureUpdate);
});
