import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../../modules/user/entities/User";
import { Product } from "../../product/entities/Product";

@Entity("stock_moviment")
export class StockMoviment {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	idMoviment: string;

	@Column()
	quantity: number;

	@Column()
	document: string;

	@ManyToOne(() => Product, (Product) => Product.id)
	product_id: string;

	@ManyToOne(() => User, (User) => User.id)
	user_id: string;
}
