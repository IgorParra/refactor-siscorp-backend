import { Product } from "../../product/entity/Product";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("stock")
export class Stock {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	quantity: number;

	@Column()
	provider: string;

	@Column()
	batch: string;

	@Column("timestamp")
	validity: Date;

	@ManyToOne(() => Product, (Product) => Product.id)
	product_id: Product;

	@Column()
	idMoviment: string;
}
