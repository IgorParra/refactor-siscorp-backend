import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("transaction_map")
export class TransactionMap {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", name: "internal_code" })
	InternalCode: string;

	@Column({ type: "varchar", name: "transaction_name" })
	TransactionName: string;

	@Column()
	accounts_plan: string;
}
