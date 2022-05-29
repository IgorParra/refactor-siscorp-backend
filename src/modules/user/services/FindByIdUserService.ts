import AppError from "../../../shared/errors/AppError";
import { AppDataSource } from "../../../shared/database";
import { User } from "../entities/User";


export class FindByIdUserService {
    async execute(id: string) {
        const rep = AppDataSource.getRepository(User);

        const user = await rep.findOne({
            where: { id },
        });

         if(!(user)){
            throw new AppError({ message: "User does not exists!" }); 
         }

        return user;
    }

}