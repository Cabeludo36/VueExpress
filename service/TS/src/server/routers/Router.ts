import { Application, Router } from "express";
import { userRouter } from "./UserRT";
import { docRouter } from "./DocRT";
const cors = require('cors')


export const useRoutes = (app: Application) => {
    const apiRouter: Router = Router();
    apiRouter.use('/users', userRouter);
    apiRouter.use('/docs', docRouter);
    
    app.use('/api/v1',cors(), apiRouter);
}
