import { Router } from "express";
import { UpdateMovimentationNatureDescription } from "modules/movimentationNature/services/UpdateMovimentationNatureDescription";
import { EnsureUserIsAuthenticated } from "../../../shared/routes/middlewares/EnsureUserIsAuthenticated";
import { CreateMovimentationNatureService } from "../services/CreateNatureMovimentation";

export const movimentationNatureRoutes = Router();

movimentationNatureRoutes.use(EnsureUserIsAuthenticated);

movimentationNatureRoutes.post("/", async (request, response) => {
	const movimentationNature = request.body;

	const movimentationNatureRoutesService =
		new CreateMovimentationNatureService();

	const newMovimentationNature = await movimentationNatureRoutesService.execute(
		movimentationNature
	);

	return response.json(newMovimentationNature);
});
movimentationNatureRoutes.put(
	"/movimentation-nature/:idToUpdate",
	async (request, response) => {
		const { idToUpdate } = request.params;
		const { desc } = request.body;

		const movimentationNatureService =
			new UpdateMovimentationNatureDescription();

		const movimentationNatureUpdate = await movimentationNatureService.execute(
			idToUpdate,
			desc
		);

		return response.json(movimentationNatureUpdate);
	}
);
