import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth.json";
import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { User } from "../../user/entities/User";

export class LoginService {
	async execute(email: string, password: string) {
		const UsersRepository = AppDataSource.getRepository(User);

		const user = await UsersRepository.findOne({
			where: { email },
		});

		if (!user) {
			throw new AppError({ message: "User does not exists!" });
		}

		const passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw new AppError({ message: "Invalid password/email combination" });
		}

		const token = sign({ id: user.id }, authConfig.secret, {
			expiresIn: authConfig.valid,
		});

		return token;
	}
}
