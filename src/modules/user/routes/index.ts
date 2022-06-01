import { Router } from "express";
import "reflect-metadata";
import { User } from "../entities/User";
import CreateUserService from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { FindByIdUserService } from "../services/FindByIdUserService";
import { GetAllUserService } from '../services/GetAllUserService';
import { UpdeteUserService } from "../services/UpdeteUserService";

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

userRoutes.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;

	const userService = new UpdeteUserService();

	const userUpdate = await userService.execute(id, name, email, password);

	return res.json(userUpdate);
	
})