
import { Stock } from "../../stock/entity/Stock";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";

@Entity("product")
export class Product {
	@PrimaryGeneratedColumn("uuid")
	id: string;

    @Column()
    barcode: string;

    @Column()
	name: string;

    @Column()
    brand: string;

    @Column()
    description: string;

    @Column()
    complementation: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	last_movement: Date;

	@OneToMany(() => Stock, (Stock)=> Stock.product)
	stock: Stock[];
}
