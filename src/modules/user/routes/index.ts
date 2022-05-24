import { Router } from "express";
import "reflect-metadata";
import { User } from "../entities/User";
import CreateUserService from "../services/CreateUserService";

export const userRoutes = Router();

userRoutes.post("/", async (request, response) => {
	const { name, email, password } = request.body;

	const createUser = new CreateUserService();

	const user = await createUser.execute({ name, email, password });

	const responseUser: Partial<User> = { ...user };

	delete responseUser.password;

	return response.json(responseUser);
});
