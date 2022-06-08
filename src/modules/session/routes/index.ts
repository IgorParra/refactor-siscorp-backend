import { Router } from "express";
import { LoginService } from "../services/LoginService";

export const loginRoutes = Router();

loginRoutes.post("/", async (request, response) => {
	const { email, password } = request.body;

	const loginService = new LoginService();

	const token = await loginService.execute(email, password);

	return response.json({ token });
});
