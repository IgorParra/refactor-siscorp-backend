import { Product } from "modules/product/entity/Product";
import { AppDataSource } from "../../../shared/database";

export class GetAllProductsService{
async execute() {
    const stockRepository = AppDataSource.getRepository(Product);
    const productsInStock = await stockRepository.find({ 
    });
    
    return productsInStock;
}

}