import { Product } from "modules/product/entity/Product";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stock } from "./Stock";

@Entity("stock_moviment")
export class Stock_moviment {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	idMoviment: string;

	@Column()
	quantity: number;

	@Column()
	documentCode: string;

	@ManyToOne(() => Product, (Product) => Product.barcode)
	product: Stock;
}
