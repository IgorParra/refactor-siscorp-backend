import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { Product } from "../../product/entities/Product";
import { Stock } from "../entity/Stock";

export class FindProductStockServices {
	async execute(barcodeProduct: string) {
		const productRepository = AppDataSource.getRepository(Product);
		const stockRepository = AppDataSource.getRepository(Stock);

		const productFound = await productRepository.findOne({
			where: { barcode: barcodeProduct },
		});

		if (!productFound) {
			throw new AppError({ message: "Product not registered." });
		}

		const productStock = await stockRepository.find({
			select: {
				quantity: true,
				provider: true,
				batch: true,
				validity: true,
			},
			relations: ["product"],
			where: {
				id: productFound.id,
			},
		});

		return productStock;
	}
}
