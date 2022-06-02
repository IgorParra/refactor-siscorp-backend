import { User } from "../../../../modules/user/entities/User";
import { AppDataSource } from "../../../../shared/database";
import AppError from "../../../../shared/errors/AppError";

var bcrypt = require('bcryptjs');

export class LoginService {
    async execute(email: string, password: string) {
        const rep = AppDataSource.getRepository(User);

        const user = await rep.findOne({
            where: { email },
        });

        if (!(user)) {
            throw new AppError({ message: "User does not exists!" });
        }

        if (!await bcrypt.compareSync(password, user.password)) {
            throw new AppError({ message: "Invalid password!" });
        }

        return user;
    }


}