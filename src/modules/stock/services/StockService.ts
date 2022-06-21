import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { Stock } from "../entity/Stock";
import { StockMoviment } from "../entity/StockMoviment";
import { MovimentationNature } from "./../../movimentationNature/entities/MovimentationNature";

interface StockServiceProps {
	movimentation: string;
	product: Stock;
	document: string;
	user_id: string;
}

export class MovimentStockService {
	public async execute({
		document,
		movimentation,
		product,
		user_id,
	}: StockServiceProps): Promise<StockMoviment> {
		const { quantity, product_barcode, id } = product;
		const stockRepository = AppDataSource.getRepository(Stock);
		const stockMovimentRepository = AppDataSource.getRepository(StockMoviment);
		const movimentationNatureRepository =
			AppDataSource.getRepository(MovimentationNature);

		const productAlreadyExist = await stockRepository.findOne({
			where: { product_barcode },
		});

		const movimentationNature = await movimentationNatureRepository.findOne({
			where: { id: movimentation },
		});

		if (!productAlreadyExist) {
			throw new AppError({ message: "Product not registered." });
		}

		if (!movimentationNature) {
			throw new AppError({
				message: "Natureza da movimentação não encontrada",
			});
		}
		if (!productAlreadyExist) {
			const newProductInStock = stockRepository.create(product);
			await stockRepository.save(newProductInStock);

			const newMovimentation = stockMovimentRepository.create({
				idMoviment: movimentationNature.id,
				quantity,
				document,
				product_barcode,
			});

			await stockMovimentRepository.save(newMovimentation);

			return newMovimentation;
		}

		await stockRepository.update(productAlreadyExist.id, {
			...productAlreadyExist,
			quantity: movimentationNature.isEntry
				? productAlreadyExist.quantity + quantity
				: productAlreadyExist.quantity - quantity,
		});

		const newMovimentation = stockMovimentRepository.create({
			idMoviment: movimentationNature.id,
			quantity,
			document,
			product_barcode,
		});

		await stockMovimentRepository.save(newMovimentation);

		return newMovimentation;
	}
}
