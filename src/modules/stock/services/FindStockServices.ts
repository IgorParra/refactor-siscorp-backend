import { RelationId } from "typeorm";
import { Product } from "../../../modules/product/entity/Product";
import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { Stock } from "../entity/Stock";

export class FindStockServices {
    async execute(barcodeProduct: string) {
        const productRepository = AppDataSource.getRepository(Product)
        const stockRepository = AppDataSource.getRepository(Stock)

        const productFound = await productRepository.findOne({
            where: { barcode: barcodeProduct },
        })

        if (!productFound) {
            throw new AppError({ message: "Product not registered." })
        }

        const productStock = await stockRepository.find({
            select: {
                quantity: true,
                provider: true,
                batch: true,
                validity:  true

            },            
            relations: ["barcode"],
            where: {
                barcode : {
                    id : productFound.id
                }
            }
           
        });

        return productStock;
    }
}