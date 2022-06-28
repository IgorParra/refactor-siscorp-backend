import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { MovimentationNature } from "../entities/MovimentationNature";

type Request = Omit<MovimentationNature, "id"> & {
	accounts_plan: string;
};

export class CreateMovimentationNatureService {
	public async execute(props: Request): Promise<MovimentationNature> {
		const { description, isEntry, transactionId } = props;
		const movimentationNatureRepository =
			AppDataSource.getRepository(MovimentationNature);

		const movimentationNatureAlreadyExist =
			await movimentationNatureRepository.findOne({
				where: { description },
			});

		if (movimentationNatureAlreadyExist) {
			throw new AppError({ message: "Description already used" });
		}

		movimentationNatureRepository
			.createQueryBuilder("movimentation_nature")
			.insert()
			.into(MovimentationNature)
			.values([{ description, isEntry, transactionId }])
			.execute();

		return;
	}
}
