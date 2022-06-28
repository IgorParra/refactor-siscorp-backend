import { AppDataSource } from "../../../shared/database";
import { Product } from "../../product/entities/Product";

interface UpdateProductServiceProps {
	barcode: string;
	name: string;
	brand: string;
	description: string;
	complementation: string;
}

export class UpdateProductService {
	async execute(newProductData: UpdateProductServiceProps) {
		const ProductsRepository = AppDataSource.getRepository(Product);
		const { barcode } = newProductData;

		let product = await ProductsRepository.findOne({
			where: { barcode },
		});

		product = { ...product, ...newProductData };
		ProductsRepository.save(product);
	}
}
