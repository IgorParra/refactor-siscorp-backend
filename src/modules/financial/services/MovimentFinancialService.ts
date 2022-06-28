import { AppDataSource } from "../../../shared/database";
import { TransactionMap } from "../entities/TransactionMap";

export class MovimentFinancialService {
	public async execute(transaction_map_item: string) {
		const TransactionMapRepository =
			AppDataSource.getRepository(TransactionMap);

		const prod = TransactionMapRepository.find({
			where: { id: transaction_map_item },
		});

		console.log(prod);

		return;
	}
}
