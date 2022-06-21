import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { MovimentationNature } from "../entities/MovimentationNature";

export class UpdateMovimentationNatureDescription {
	async execute(id: string, description: string) {
		const movimentationNatureRepository =
			AppDataSource.getRepository(MovimentationNature);

		const movimentationNatureAlreadyExist =
			await movimentationNatureRepository.findOne({
				where: { id },
			});

		if (!movimentationNatureAlreadyExist) {
			throw new AppError({ message: "Movimentation Nature does not exist!" });
		}

		movimentationNatureAlreadyExist.description = description;

		movimentationNatureRepository.save(movimentationNatureAlreadyExist);
	}
}
