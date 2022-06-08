import { AppDataSource } from "../../../shared/database";
import { User } from "../entities/User";

export class GetAllUserService {
	async execute() {
		const usersRepository = AppDataSource.getRepository(User);

		const users = await usersRepository.find();

		return users;
	}
}
