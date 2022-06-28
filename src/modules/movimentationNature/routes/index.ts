import { Router } from "express";

import { UpdateMovimentationNatureDescription } from "../../../modules/movimentationNature/services/UpdateMovimentationNatureDescription";
import { CreateMovimentationNatureService } from "../services/CreateNatureMovimentation";

export const movimentationNatureRoutes = Router();

movimentationNatureRoutes.post("/", async (request, response) => {
	const movimentationNature = request.body;

	const movimentationNatureService = new CreateMovimentationNatureService();

	await movimentationNatureService.execute(movimentationNature);

	return response.status(202).json({ message: "criado com suceso" });
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
