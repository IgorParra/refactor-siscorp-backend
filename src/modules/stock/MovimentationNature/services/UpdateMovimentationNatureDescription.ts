import { AppDataSource } from "../../../shared/database";
import { MovimentationNature } from "../entities/MovimentationNature";

export class UpdateMovimentationNatureDescription {
	async execute(id: string, description: string) {
		const MovimentationNatureRepository = AppDataSource.getRepository(MovimentationNature);

		const MovimentationNatureAlreadyExist = await MovimentationNatureRepository.findOne({
			where: { id },
		   });
	
		   if (!(MovimentationNatureAlreadyExist)) {
			 throw new AppError({ message: "Movimentation Nature does not exist!" });

		   } 

		   const movimentationNature = await MovimentationNatureRepository.findOne({
			where: { id },
		});

		movimentationNature.description = description;

		MovimentationNatureRepository.save(movimentationNature);
	}
}
