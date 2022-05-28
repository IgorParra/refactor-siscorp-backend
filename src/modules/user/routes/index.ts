import { DeleteUserService } from './../services/DeleteUserService';
import { request, Router } from "express";
import "reflect-metadata";
import { User } from "../entities/User";
import CreateUserService from "../services/CreateUserService";
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

  userRoutes.delete('/:id', async (request, response) => {
	const { id } = request.params;

	const users = new DeleteUserService();

	const result = await users.execute(id);

	if(result instanceof Error) {
		return response.status(400).json(result.message);	
	}

	return response.status(204).end();
  });