import { Stock } from "../entity/Stock";
import { AppDataSource } from "../../../shared/database";

export class GetAllProductsInStockService{
async execute() {
    const stockRepository = AppDataSource.getRepository(Stock);
    const productsInStock = await stockRepository.find();
    return productsInStock;
}

}