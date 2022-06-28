import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { MovimentFinancialService } from "../../financial/services/MovimentFinancialService";
import { Product } from "../../product/entities/Product";
import { Stock } from "../entity/Stock";
import { StockMoviment } from "../entity/StockMoviment";
import { MovimentationNature } from "./../../movimentationNature/entities/MovimentationNature";

type StockServiceProps = Stock & {
	product: Stock;
	document: string;
	user_id: string;
};

export class MovimentStockService {
	public async execute(props: StockServiceProps): Promise<StockMoviment> {
		let user_id = "b03d9544-c2b0-428e-9126-88b2ee3a4537";

		const { idMoviment, product, document } = props;
		const { quantity, product_id, provider, validity, batch } = product;
		const stockRepository = AppDataSource.getRepository(Stock);
		const stockMovimentRepository = AppDataSource.getRepository(StockMoviment);
		const movimentationNatureRepository =
			AppDataSource.getRepository(MovimentationNature);

		console.log(product);

		// const productAlreadyExist = await stockRepository.findOne({
		// 	where: { batch, provider, product_id, validity },
		// });

		// console.log(product_id);
		const productAlreadyExist = stockRepository
			.createQueryBuilder("stock")
			.innerJoinAndSelect(Product, "stock.product_id", "product.id")
			.where(
				"stock.batch = :batch AND stock.provider = :provider AND stock.product_id = :product_id AND stock.validity =:validity",
				{ batch, provider, product_id, validity }
			)
			.getOne();

		console.log(productAlreadyExist);
		return;

		const movimentationNature = await movimentationNatureRepository.findOne({
			where: { id: idMoviment },
		});

		if (!movimentationNature) {
			throw new AppError({
				message: "Natureza da movimentação não encontrada",
			});
		}

		if (!productAlreadyExist) {
			const newProductInStock = stockRepository.create(product);
			await stockRepository.save(newProductInStock);

			const newMovimentation = stockMovimentRepository.create({
				document,
				idMoviment: movimentationNature.id,
				product_id,
				quantity,
				user_id,
			});

			await stockMovimentRepository.save(newMovimentation);

			const movimentFinancialService = new MovimentFinancialService();

			movimentFinancialService.execute(movimentationNature.transactionId);

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
			product_id,
			user_id,
		});

		await stockMovimentRepository.save(newMovimentation);

		return newMovimentation;
	}
}
