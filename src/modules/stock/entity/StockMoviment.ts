import {
	Column,
    ManyToOne,
	Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Stock } from "./Stock";

@Entity("stock_moviment")
export class Stock_moviment{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    idMoviment: string;

    @Column()
	quantity: number;

    @Column()
	documentCode: string;

    @ManyToOne(() => Stock, (Stock) => Stock.stock_moviment)
    product_in_stock_id: Stock;
}