import { Router } from "express";
import { EnshureUserIsAuthenticated } from "../../modules/user/routes/middlewares/EnsureUserIsAuthenticated";
import { CreateMovimentationNatureService } from "./services/CreateNatureMovimentation";


export const movimentationNatureRoutes = Router();

movimentationNatureRoutes.use(EnshureUserIsAuthenticated);

movimentationNatureRoutes.post("/", async(request, response) =>{
    const movimentationNature = request.body;

    const movimentationNatureRoutesService = new CreateMovimentationNatureService();
    
    const newMovimentationNature = await movimentationNatureRoutesService.execute(movimentationNature);

    return response.json(newMovimentationNature);
    
});