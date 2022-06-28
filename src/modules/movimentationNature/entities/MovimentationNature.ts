import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";

import { TransactionMap } from "../../../modules/financial/entities/TransactionMap";

@Entity("movimentation_nature")
export class MovimentationNature {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	description: string;

	@Column()
	isEntry: boolean;

	@ManyToMany(() => TransactionMap, (TransactionMap) => TransactionMap.id, {
		cascade: true,
	})
	@JoinColumn({
		referencedColumnName: "id",
		name: "transaction_map_item",
	})
	transactionId: TransactionMap["id"];
}
