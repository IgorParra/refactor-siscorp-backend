import { AppDataSource } from "../../../shared/database";
import { User } from "../entities/User";

export class UpdateUserService {
	async execute(id: string, name: string, email: string, password: string) {
		const UsersRepository = AppDataSource.getRepository(User);

		const user = await UsersRepository.findOne({
			where: { id },
		});

		user.name = name;
		user.email = email;
		user.password = password;

		UsersRepository.save(user);
	}
}
