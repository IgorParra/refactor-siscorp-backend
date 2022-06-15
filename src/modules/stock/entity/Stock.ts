import { Product } from "../../product/entity/Product";
import { Stock_moviment } from "./StockMoviment";

import {
	Column,
	Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";

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

    @OneToMany(() => Stock_moviment, (Stock_moviment)=> Stock_moviment.product_in_stock_id)
	stock_moviment: Stock_moviment[];

    @ManyToOne(() => Product, (Product) => Product.stock)
    product_id: Product;

    @Column()
    idMoviment: string;


}
