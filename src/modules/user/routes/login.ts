import { Router } from "express";
import { User } from "../entities/User";
import { FindByIdUserService } from "../services/FindByIdUserService";
import { LoginService } from "../services/login/LoginService";

export const loginRoutes = Router();

loginRoutes.post('/', async (req, res) => {
    const { email, password } = req.body;

    const loginService = new LoginService();

    const {user, token} = await loginService.execute(email, password);

    return res.json({user, token});
    
})