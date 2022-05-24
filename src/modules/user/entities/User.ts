import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@CreateDateColumn()
	created_at: Date;

	@Column()
	email: string;

	@Column()
	name: string;

	@Column()
	password: string;

	@UpdateDateColumn()
	updated_at: Date;
}
