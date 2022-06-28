import AppError from '../../../shared/errors/AppError'
import { TransactionMap } from '../entities/TransactionMap'
import { AppDataSource } from './../../../shared/database/index'

export type CreateTransactionMapItemProps = Omit<TransactionMap, "id">;

export class CreateTransactionMapItem {
	public async execute(props: CreateTransactionMapItemProps) {
		const transactionMapRepository =
			AppDataSource.getRepository(TransactionMap);
		const { InternalCode, accounts_plan, TransactionName, isCredit } = props;

		console.log(accounts_plan);

		const transactionMapItemAlreadyExist = await transactionMapRepository
			.createQueryBuilder("transaction_map")
			.leftJoinAndSelect("transaction_map.accounts_plan", "accounst_plan")
			.where(
				"transaction_map.accounts_plan = :accounts_plan AND transaction_map.isCredit = :isCredit AND transaction_map.internal_code = :InternalCode AND transaction_map.transaction_name = :TransactionName",
				{
					accounts_plan,
					InternalCode,
					isCredit,
					TransactionName,
				}
			)

			.getOne();

		console.log(transactionMapItemAlreadyExist);

		if (transactionMapItemAlreadyExist) {
			throw new AppError({ message: "Essa relação já existe" });
		}

		const newTransactionMapItem = await transactionMapRepository.create(props);

		await transactionMapRepository.save(newTransactionMapItem);

		return;
	}
}
