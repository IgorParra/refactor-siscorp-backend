import { AppDataSource } from "../../../shared/database";
import { User } from "../entities/User";

export class UpdeteUserService {



    async execute(id: string, name: string, email: string, password: string) {
        const rep = AppDataSource.getRepository(User);

        const user = await rep.findOne({
            where : {id},
        });

        user.name = name;
        user.email = email;
        user.password = password;

        rep.save(user);
    }
}