import { AppDataSource } from "../../../shared/database";
import { User } from "../entities/User";

export class GetAllUserService{
   async execute() {
       const repo = AppDataSource.getRepository(User);

       const users = await repo.find();

       return users;
   }
}