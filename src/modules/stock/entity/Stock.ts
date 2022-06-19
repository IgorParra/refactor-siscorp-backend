import { Product } from "../../product/entities/Product";

import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("stock")
export class Stock {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	idMoviment: string;

	@Column()
	documentCode: string;

	@Column()
	quantity: number;

	@Column()
	provider: string;

	@Column()
	batch: string;

	@CreateDateColumn()
	validity: Date;

	@ManyToOne(() => Product, (Product) => Product.barcode)
	barcode: Product;
}
