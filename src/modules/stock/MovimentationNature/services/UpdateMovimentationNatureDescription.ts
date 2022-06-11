import { AppDataSource } from "../../../shared/database";
import { MovimentationNature } from "../entities/MovimentationNature";

export class UpdateMovimentationNatureDescription {
	async execute(id: string, description: string) {
		const MovimentationNatureRepository = AppDataSource.getRepository(MovimentationNature);

		const movimentationnature = await MovimentationNatureRepository.findOne({
			where: { id },
		});

		movimentationnature.description = description;

		const MovimentationNatureAlreadyExist = await repo.findOne({
			where: { id },
		   });
	
		   if (!(MovimentationNatureAlreadyExist)) {
			 throw new AppError({ message: "Movimentation Nature does not exist!" });
		   } 

		MovimentationNatureRepository.save(movimentationnature);
	}
}
