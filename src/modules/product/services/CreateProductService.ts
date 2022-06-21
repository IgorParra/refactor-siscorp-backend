import { AppDataSource } from "../../../shared/database";
import AppError from "../../../shared/errors/AppError";
import { Product } from "../entities/Product";

interface Request {
	barcode: string;
	name: string;
	brand: string;
	description: string;
	complementation: string;
}

export class CreateProductService {
	public async execute(product: Request): Promise<Product> {
		const { barcode } = product;
		const productRepository = AppDataSource.getRepository(Product);

		const productAlreadyExist = await productRepository.findOne({
			where: { barcode },
		});

		if (productAlreadyExist) {
			throw new AppError({ message: "barcode already used" });
		}

		const newProduct = productRepository.create(product);

		await productRepository.save(newProduct);

		return newProduct;
	}
}
