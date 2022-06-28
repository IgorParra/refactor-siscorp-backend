import AppError from "../../../shared/errors/AppError";
import { TransactionMap } from "../entities/TransactionMap";
import { AppDataSource } from "./../../../shared/database/index";

export type CreateTransactionMapItemProps = Omit<TransactionMap, "id"> & {
	accounts_plan: { accounts_plan_item: string; isEntry: boolean };
};

export class CreateTransactionMapItem {
	public async execute(props: CreateTransactionMapItemProps) {
		const transactionMapRepository =
			AppDataSource.getRepository(TransactionMap);
		const { InternalCode, accounts_plan, TransactionName } = props;

		const transactionMapItemAlreadyExist = await transactionMapRepository
			.createQueryBuilder("transaction_map")
			.where(
				"transaction_map.accounts_plan = :accounts_plan  AND transaction_map.internal_code = :InternalCode AND transaction_map.transaction_name = :TransactionName",
				{
					accounts_plan: JSON.stringify(accounts_plan),
					InternalCode,
					TransactionName,
				}
			)

			.getOne();

		if (transactionMapItemAlreadyExist) {
			throw new AppError({ message: "Essa relação já existe" });
		}

		await transactionMapRepository
			.createQueryBuilder("transaction_map")
			.insert()
			.into(TransactionMap)
			.values({
				accounts_plan: JSON.stringify(accounts_plan),
				InternalCode,
				TransactionName,
			})
			.execute();

		return;
	}
}
