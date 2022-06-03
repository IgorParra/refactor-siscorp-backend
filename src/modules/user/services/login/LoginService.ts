import { User } from "../../../../modules/user/entities/User";
import { AppDataSource } from "../../../../shared/database";
import AppError from "../../../../shared/errors/AppError";
import { compare } from 'bcryptjs';
const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth.json");



export class LoginService {
    async execute(email: string, password: string) {
        const rep = AppDataSource.getRepository(User);

        const user = await rep.findOne({
            where: { email },
        });

        if (!(user)) {
            throw new AppError({ message: "User does not exists!" });
        }

        if (!await compare(password, user.password)) {
            throw new AppError({ message: "Invalid password!" });
        }

        const token = jwt.sign({ id: user.id}, authConfig.secret, {
            expiresIn: 86400,
        });
        

        return {user,token};
    }


}