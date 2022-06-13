import { request } from "express";
import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { Product } from "modules/product/entity/Product";
import { Stock } from "../entity/Stock";
import { MovimentService } from "./MovimentService";

interface request {
    idMoviment: string,
    documentCode: string,
    barcode: string,
    quantity: number,
    provider: string,
    batch: string,
    validity: Date
}


export class StockService {
    public async execute({ idMoviment, documentCode, barcode, quantity, provider, batch, validity }: request): Promise<Stock> {
        const naturezaMovimento = true;
        const productRepository = AppDataSource.getRepository(Product);
        const stockRepository = AppDataSource.getRepository(Stock);

        const producAlreadyExist = await productRepository.findOne({
            where: { barcode },
        });

        if (!producAlreadyExist) {
            throw new AppError({ message: "Product not registered." })
        }

        const productsStockExisting = await stockRepository.find({
            where: [{ barcode: { barcode } }],
        });
        if (productsStockExisting.length == 0) {
            const newProductStock = stockRepository.create({
                idMoviment,
                documentCode,
                barcode: producAlreadyExist,
                quantity,
                provider,
                batch,
                validity
            });

            await stockRepository.save(newProductStock);
            const movimentService = new MovimentService();
            movimentService.execute({ idMoviment, quantity, stock: newProductStock });
            return newProductStock;
        }
        var total = 0;
        for (var i = 0; i < productsStockExisting.length; i++) {
            total = total + productsStockExisting[i].quantity;
            if (naturezaMovimento == true) {
                if (productsStockExisting[i].provider == provider && productsStockExisting[i].batch == batch
                    // && product.validity.valueOf() == validity.valueOf() 
                ) {

                    const updateQuantity = await stockRepository.findOne({
                        where: { id: productsStockExisting[i].id },
                    });


                    updateQuantity.quantity = updateQuantity.quantity + quantity;
                    await stockRepository.save(updateQuantity);
                    const movimentService = new MovimentService();
                    movimentService.execute({ idMoviment, quantity, stock: updateQuantity });

                    return updateQuantity
                }
            }
        }
        if (naturezaMovimento == false) {
            if (total < quantity) {
                throw new AppError({ message: "Quantity not available." })
            } else {
                for (var i = 0; i < productsStockExisting.length; i++) {

                    const updateQuantity = await stockRepository.findOne({
                        where: { id: productsStockExisting[i].id },
                    });

                    if (updateQuantity.quantity < quantity) {
                        quantity = quantity - updateQuantity.quantity;
                        updateQuantity.quantity = 0;
                        await stockRepository.save(updateQuantity);
                    } else {
                        updateQuantity.quantity = updateQuantity.quantity - quantity;
                        await stockRepository.save(updateQuantity);
                        const movimentService = new MovimentService();
                        movimentService.execute({ idMoviment, quantity, stock: updateQuantity });

                        return updateQuantity
                    }


                }
            }
        }

        const newProductStock = stockRepository.create({
            idMoviment,
            documentCode,
            barcode: producAlreadyExist,
            quantity,
            provider,
            batch,
            validity
        });

        await stockRepository.save(newProductStock);
        const movimentService = new MovimentService();
        movimentService.execute({ idMoviment, quantity, stock: newProductStock });
        return newProductStock;

        //---------------------------------------------------------------------------------
        //const natureMovimentRepository = AppDataSource.getRepository(natureMoviment);

        // const natureMovimentRepository = await productRepository.findOne({
        //     where : {barcode}
        // })

        // if(!natureMovimentRepository){
        //     throw new AppError({ message: "Nature of moviment not registered!!!"})            
        // }

    }


}