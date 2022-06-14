import { AppDataSource } from "../../../shared/database"
import AppError from "../../../shared/errors/AppError";
import { MovimentationNature } from "../../user/entities/MovimentationNature";

interface Request {
    description: string;
    isEntry: boolean;
}

export class CreateMovimentationNatureService {
    public async execute({description, isEntry}: Request): Promise<MovimentationNature>{
        const MovimentationNatureRepository = AppDataSource.getRepository(MovimentationNature);

        const movimentationNatureAlreadyExist = await MovimentationNatureRepository.findOne({
            where: {description},
        });

        if(movimentationNatureAlreadyExist){
            throw new AppError({ message: "Description already used"});
        }

        const newMovimentationNature = MovimentationNatureRepository.create({
            description, isEntry,
        });

        await MovimentationNatureRepository.save(newMovimentationNature);
        
        return newMovimentationNature;
    }
}