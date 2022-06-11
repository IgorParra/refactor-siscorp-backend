import { AppDataSource } from "../../../shared/database";
import { Moviment } from "../entity/Moviment";
import { Stock } from "../entity/Stock";

interface request {

    idMoviment: string,
    quantity: number,
    stock: Stock
}

export class MovimentService {

    public async execute({ idMoviment, quantity, stock }: request) {

        const movimentRepository = AppDataSource.getRepository(Moviment);

       const newMoviment = movimentRepository.create({
        idMoviment,
        quantity,
        stock
       });

       movimentRepository.save(newMoviment);
    };

}