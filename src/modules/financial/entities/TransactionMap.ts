import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { MovimentationNature } from '../../../modules/movimentationNature/entities/MovimentationNature'
import { AccountsPlan } from './AccountsPlan'

@Entity("transaction_map")
export class TransactionMap {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", name: "internal_code" })
	InternalCode: string;

	@Column({ type: "varchar", name: "transaction_name" })
	TransactionName: string;

	@ManyToOne(() => AccountsPlan, (AccountsPlan) => AccountsPlan.id, {
		eager: true,
	})
	@JoinColumn({ referencedColumnName: "id", name: "accounts_plan_id" })
	accounts_plan: AccountsPlan["id"];

	@ManyToMany(
		() => MovimentationNature,
		(MovimentationNature) => MovimentationNature.transactionId
	)
	@JoinColumn({ referencedColumnName: "transaction_map_item_id" })
	movimentation_nature: MovimentationNature;

	@Column()
	isCredit: boolean;
}
