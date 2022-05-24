import { hash } from "bcryptjs";
import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { User } from "../entities/User";

interface Request {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	public async execute({ name, email, password }: Request): Promise<User> {
		const usersRepository = AppDataSource.getRepository(User);

		const userAlreadyExist = await usersRepository.findOne({
			where: { email },
		});

		if (userAlreadyExist) {
			throw new AppError({ message: "Email address already used" });
		}

		const hashedPassword = await hash(password, 8);

		const newUser = usersRepository.create({
			email,
			password: hashedPassword,
			name,
		});

		await usersRepository.save(newUser);
		return newUser;
	}
}

export default CreateUserService;
