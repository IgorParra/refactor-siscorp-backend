import { AppDataSource } from "../../../shared/database/index";
import { AccountsPlan } from "../entities/AccountsPlan";

export class CreateItemOfAccountsPlanService {
	public async execute(props: Omit<AccountsPlan, "id" | "balance">) {
		const accountsPlanRepository = AppDataSource.getRepository(AccountsPlan);
		const newItem = accountsPlanRepository.create({
			...props,
			parent: props.parent,
			balance: 0,
		});
		await accountsPlanRepository.save(newItem);

		return;
	}
}
