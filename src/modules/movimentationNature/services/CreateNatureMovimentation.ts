import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { MovimentationNature } from "../entities/MovimentationNature";

interface Request {
	description: string;
	isEntry: boolean;
}

export class CreateMovimentationNatureService {
	public async execute({
		description,
		isEntry,
	}: Request): Promise<MovimentationNature> {
		const movimentationNatureRepository =
			AppDataSource.getRepository(MovimentationNature);

		const movimentationNatureAlreadyExist =
			await movimentationNatureRepository.findOne({
				where: { description },
			});

		if (movimentationNatureAlreadyExist) {
			throw new AppError({ message: "Description already used" });
		}

		const newMovimentationNature = movimentationNatureRepository.create({
			description,
			isEntry,
		});

		await movimentationNatureRepository.save(newMovimentationNature);

		return newMovimentationNature;
	}
}
