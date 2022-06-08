import { isUid } from "uuid";
import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { User } from "../entities/User";

export class FindUserByIdOrEmail {
	async execute(param: string) {
		const UsersRepository = AppDataSource.getRepository(User);
		const regexUuid = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

		const findById = regexUuid.test(param);

		const user = await UsersRepository.findOne({
			where: findById ? { id: param } : { email: param },
		});

		if (!user) {
			throw new AppError({ message: "User does not exists!" });
		}

		return user;
	}
}
