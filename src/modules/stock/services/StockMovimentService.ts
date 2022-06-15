import { AppDataSource } from "../../../shared/database";
import { Stock_moviment } from "../entity/StockMoviment";
import { Stock } from "../entity/Stock";

export class StockMovimentService {

    public async execute(stockMoviment: Stock_moviment) {

        const movimentRepository = AppDataSource.getRepository(Stock_moviment);

        const newMoviment = movimentRepository.create(stockMoviment);
        
        movimentRepository.save(newMoviment);
    };

}