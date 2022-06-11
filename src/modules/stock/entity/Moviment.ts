import {
	Column,
    ManyToOne,
	Entity,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Stock } from "./Stock";

@Entity("moviment")
export class Moviment{
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    idMoviment: string;

    @Column()
	quantity: number;

    @ManyToOne(() => Stock, (Stock) => Stock.moviment)
    stock: Stock;
}