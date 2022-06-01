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
	public async execute({ barcode, name, brand, description, complementation }: Request): Promise<Product> {
		const rep = AppDataSource.getRepository(Product);

		const userAlreadyExist = await rep.findOne({
			where: { barcode },
		});

		if (userAlreadyExist) {
			throw new AppError({ message: "barcode address already used" });
		}

		const newProduct = rep.create({
			barcode,
			name,
			brand,
			description,
			complementation
		});

		await rep.save(newProduct);
		return newProduct;
	}
}
