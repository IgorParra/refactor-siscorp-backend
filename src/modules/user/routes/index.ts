import { Router } from "express";
import "reflect-metadata";
import { EnshureUserIsAuthenticated } from "../routes/middlewares/EnsureUserIsAuthenticated";
import {
	CreateUserService,
	DeleteUserService,
	FindUserByIdOrEmail,
	GetAllUserService,
	UpdateUserService,
} from "../services";

export const userRoutes = Router();
export const userPrivateRoutes = Router();

userPrivateRoutes.use(EnshureUserIsAuthenticated);

userRoutes.post("/", async (request, response) => {
	const { name, email, password } = request.body;

	const createUser = new CreateUserService();

	const user = await createUser.execute({ name, email, password });

	delete user.password;

	return response
		.status(201)
		.json({ message: "Usuário criado com sucesso", user });
});

userPrivateRoutes.get("/", async (request, response) => {
	const GetAllUser = new GetAllUserService();

	const users = await GetAllUser.execute();

	return response.status(200).json(users);
});

userPrivateRoutes.delete("/:id", async (request, response) => {
	const { id } = request.params;

	const DeleteteUser = new DeleteUserService();

	const result = await DeleteteUser.execute(id);

	return response.status(204).json(result);
});

userPrivateRoutes.get("/:id", async (request, response) => {
	const { id } = request.params;
	const FindByIdOrEmail = new FindUserByIdOrEmail();

	const result = await FindByIdOrEmail.execute(id);

	return response.status(200).json(result);
});

userPrivateRoutes.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;

	const userService = new UpdateUserService();

	const userUpdate = await userService.execute(id, name, email, password);

	return res.json(userUpdate);
});
