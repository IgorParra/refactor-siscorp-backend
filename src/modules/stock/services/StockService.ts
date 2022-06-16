import { request } from "express";
import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { Product } from "../../product/entity/Product";
import { Stock } from "../entity/Stock";
import { Stock_moviment } from "../entity/StockMoviment";
import { StockMovimentService } from "./StockMovimentService";

interface request {
    idMoviment: string,
    documentCode: string,
    barcode: string,
    quantity: number,
    provider: string,
    batch: string,
    validity: Date,
    naturezaMovimento: boolean
}


export class StockService {
    public async execute({ idMoviment, documentCode, barcode, quantity, provider, batch, validity, naturezaMovimento }: request): Promise<Stock> {
        const productRepository = AppDataSource.getRepository(Product);
        const stockRepository = AppDataSource.getRepository(Stock);
        const stock_moviment = AppDataSource.getRepository(Stock_moviment);

        const producAlreadyExist = await productRepository.findOne({
            where: { barcode },
        });

        if (!producAlreadyExist) {
            throw new AppError({ message: "Product not registered." })
        }

        const productsStockExisting = await stockRepository.findOne({
            where: { provider: provider, batch: batch, validity: validity, product_id: { id: producAlreadyExist.id } }
        });


        const newStockMovimento = stock_moviment.create({
            idMoviment,
            documentCode,
            quantity,
            product_in_stock_id: productsStockExisting
        })


        if (naturezaMovimento == true) {
            if (!productsStockExisting) {

                const newProductStock = stockRepository.create({
                    idMoviment,
                    product_id: producAlreadyExist,
                    quantity,
                    provider,
                    batch,
                    validity
                });

                newStockMovimento.product_in_stock_id = newProductStock

                await stockRepository.save(newProductStock);
                const movimentService = new StockMovimentService();
                movimentService.execute(newStockMovimento);
                return newProductStock;

            }

            productsStockExisting.quantity += quantity;

            stockRepository.save(productsStockExisting);
            const movimentService = new StockMovimentService();
            movimentService.execute(newStockMovimento);
            return productsStockExisting;

        }
        else {
            const listProductsStockExisting = await stockRepository.find({
                where: [{ product_id: { barcode } }],

            });

            //Tentar retornar o total na consuta no banco de dados
            var quantityTotal = 0;
            for (var i = 0; i < listProductsStockExisting.length; i++) {
                quantityTotal += listProductsStockExisting[i].quantity;
            }
            //----------------------------------------------
            console.log(quantityTotal + "----------->");

            //Validaçao se tem quantidade suficiente em estoque
            if (quantityTotal < quantity) {
                throw new AppError({ message: "Quantity not available." })
            } else {
                for (var i = 0; i < listProductsStockExisting.length; i++) {

                    if (listProductsStockExisting[i].quantity < quantity) {
                        quantity = quantity - listProductsStockExisting[i].quantity;
                        listProductsStockExisting[i].quantity = 0;
                        await stockRepository.save(listProductsStockExisting[i]);
                    } else if(listProductsStockExisting[i].quantity >= quantity) {
                        listProductsStockExisting[i].quantity = listProductsStockExisting[i].quantity - quantity;
                        await stockRepository.save(listProductsStockExisting[i]);
                        const movimentService = new StockMovimentService();
                        movimentService.execute(newStockMovimento);
                        return productsStockExisting;
                    }
                }
            }
        }
    }
}