import { AppDataSource } from "../../../../shared/database";
import AppError from "../../../../shared/errors/AppError";
import { Product } from "../../../user/entities/Product";

interface Request {
	barcode: string;
	name: string;
	brand: string;
	description: string;
	complementation: string;
}

export class CreateProductService {
	public async execute({
		barcode,
		name,
		brand,
		description,
		complementation,
	}: Request): Promise<Product> {
		const ProductRepository = AppDataSource.getRepository(Product);

		const productAlreadyExist = await ProductRepository.findOne({
			where: { barcode },
		});

		if (productAlreadyExist) {
			throw new AppError({ message: "barcode already used" });
		}

		const newProduct = ProductRepository.create({
			barcode,
			name,
			brand,
			description,
			complementation,
		});

		await ProductRepository.save(newProduct);

		return newProduct;
	}
}
