import { AppDataSource } from "../../../shared/database";
import { User } from "../entities/User";
import AppError from "../../../shared/errors/AppError";

export class DeleteUserService{
   async execute(id : string) {
       const repo = AppDataSource.getRepository(User);  
       
       const userAlreadyExist = await repo.findOne({
        where: { id },
       });

       if (!(userAlreadyExist)) {
         throw new AppError({ message: "User does not exists!" });
       } 
      
       return repo.delete(id);
   }
}