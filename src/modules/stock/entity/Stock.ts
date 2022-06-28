import { Product } from "../../product/entities/Product";
import { MovimentationNature } from "./../../movimentationNature/entities/MovimentationNature";

import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("stock")
export class Stock {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@ManyToMany(
		() => MovimentationNature,
		(MovimentationNature) => MovimentationNature.id,
		{
			cascade: true,
		}
	)
	@JoinColumn({
		referencedColumnName: "id",
		name: "idMoviment",
	})
	idMoviment: MovimentationNature["id"];

	@Column()
	quantity: number;

	@Column()
	provider: string;

	@Column()
	batch: string;

	@CreateDateColumn()
	validity: Date;

	@ManyToOne(() => Product, (Product) => Product.id, { eager: true })
	@JoinColumn({
		referencedColumnName: "id",
		name: "product_id",
	})
	product_id: Product["id"];
}
