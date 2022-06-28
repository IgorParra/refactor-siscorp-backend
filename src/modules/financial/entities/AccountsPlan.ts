import {
	Column,
	Entity,
	JoinColumn,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { TransactionMap } from "./TransactionMap";

@Entity("accounts_plan")
export class AccountsPlan {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	description: string;

	@ManyToMany(() => AccountsPlan, (AccountsPlan) => AccountsPlan.id)
	@JoinColumn({ referencedColumnName: "id" })
	parent: AccountsPlan;

	@Column()
	balance: number;

	@ManyToMany(
		() => TransactionMap,
		(TransactionMap) => TransactionMap.accounts_plan
	)
	@JoinColumn()
	transaction_map: AccountsPlan;
}
