import { Router } from "express";
import "reflect-metadata";
import { AccountsPlan } from "../entities/AccountsPlan";
import { CreateItemOfAccountsPlanService } from "../services/CreateItemOfAccountsPlan";
import {
	CreateTransactionMapItem,
	CreateTransactionMapItemProps,
} from "../services/CreateTransactionMapItem";

export const financialRoutes = Router();

financialRoutes.post(
	"/accounts-plan",
	async ({ body }: { body: AccountsPlan }, response) => {
		const createItemOfAccountsPlanService =
			new CreateItemOfAccountsPlanService();

		await createItemOfAccountsPlanService.execute(body);

		return response.status(200).json({ message: "Criado com sucesso" });
	}
);

financialRoutes.post(
	"/transaction-map",
	async ({ body }: { body: CreateTransactionMapItemProps }, response) => {
		const createTransactionMapItem = new CreateTransactionMapItem();

		await createTransactionMapItem.execute(body);

		return response.json({ message: "oie" });
	}
);
