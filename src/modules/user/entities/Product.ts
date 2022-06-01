import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
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
}
