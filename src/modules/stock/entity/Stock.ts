import { Product } from "../../product/entity/Product";

import {
	Column,
	CreateDateColumn,
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

    @ManyToOne(() => Product, (Product) => Product.stock)
    barcode: Product;


}
