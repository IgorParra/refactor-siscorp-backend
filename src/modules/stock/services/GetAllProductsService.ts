import { AppDataSource } from "../../../shared/database";
import { Stock } from "../entity/Stock";

export class GetAllProductsInStockService {
	async execute() {
		const stockRepository = AppDataSource.getRepository(Stock);
		const productsInStock = await stockRepository.find();
		return productsInStock;
	}
}
