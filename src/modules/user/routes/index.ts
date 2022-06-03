import { DeleteUserService } from './../services/DeleteUserService';
import { request, Router } from "express";
import "reflect-metadata";
import { User } from "../entities/User";
import CreateUserService from "../services/CreateUserService";
import { FindByIdUserService } from "../services/FindByIdUserService";
import { GetAllUserService } from '../services/GetAllUserService';
import { UpdeteUserService } from "../services/UpdeteUserService";

const authMiddleware = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

export const userRoutes = Router();
export const userMiddleRoutes = Router();

userMiddleRoutes.use(authMiddleware);


userRoutes.post("/", async (request, response) => {
	const { name, email, password } = request.body;

	const createUser = new CreateUserService();

	const user = await createUser.execute({ name, email, password });

	const responseUser: Partial<User> = { ...user };

	delete responseUser.password;

	const token = jwt.sign({ id: user.id}, authConfig.secret, {
		expiresIn: 86400,
	});

	return response.json({responseUser,token});
});


userMiddleRoutes.get('/', async (request, response) => {
	const service = new GetAllUserService();

	const users = await service.execute();

	return response.json({users});
});

userMiddleRoutes.delete('/:id', async (request, response) => {
	const { id } = request.params;

	const users = new DeleteUserService();

	const result = await users.execute(id);

	if (result instanceof Error) {
		return response.status(400).json(result.message);
	}

	return response.status(204).end();
});

userMiddleRoutes.get('/:id/:type', async (req, res) => {
	const { id } = req.params;
	const { type } = req.params;

	const userService = new FindByIdUserService();

	if (type == "id") {
		const userFound = await userService.executeId(id);
		return res.json(userFound);

	} if (type == "email") {
		const userFound = await userService.executeEmail(id);
		return res.json(userFound);

	} else {
		return res.json("Incorrect type");
	}

});

userMiddleRoutes.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { name, email, password } = req.body;

	const userService = new UpdeteUserService();

	const userUpdate = await userService.execute(id, name, email, password);

	return res.json(userUpdate);

})
