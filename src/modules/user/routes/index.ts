import { Router } from "express";
import "reflect-metadata";
import { User } from "../entities/User";
import CreateUserService from "../services/CreateUserService";
import { FindByIdUserService } from "../services/FindByIdUserService";
import { GetAllUserService } from '../services/GetAllUserService';

export const userRoutes = Router();

userRoutes.post("/", async (request, response) => {
	const { name, email, password } = request.body;

	const createUser = new CreateUserService();

	const user = await createUser.execute({ name, email, password });

	const responseUser: Partial<User> = { ...user };

	delete responseUser.password;

	return response.json(responseUser);
});

userRoutes.get('/', async (request, response) => {
	const service = new GetAllUserService();

	const users = await service.execute();

	return response.json(users);
});

userRoutes.get('/:id', async (req, res) => {
	const { id } = req.params;

	const userService = new FindByIdUserService();

	const userFound = await userService.executeId(id);
	
	return res.json(userFound);

});

userRoutes.get('/email/:email', async (req, res) => {
	const { email } = req.params;

	const userService = new FindByIdUserService();

	const userFound = await userService.executeEmail(email);
	
	return res.json(userFound);

});