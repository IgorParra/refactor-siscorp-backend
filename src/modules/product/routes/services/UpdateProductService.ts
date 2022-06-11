import { AppDataSource } from "../../../../shared/database";
import { Product } from "../../../user/entities/Product";

export class UpdateProductService {
	async execute(barcode: string,
        name: string,
        brand: string,
        description: string,
        complementation: string) {
		const ProductsRepository = AppDataSource.getRepository(Product);

		const product = await ProductsRepository.findOne({
			where: { barcode },
		});

		product.name = name;
		product.brand = brand;
		product.description = description;
        product.complementation =complementation;

		ProductsRepository.save(product);
	}
}
