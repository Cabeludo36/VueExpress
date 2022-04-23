import { Application, Router } from "express";
import { userRouter } from "./UserRT";
const cors = require('cors')


export const useRoutes = (app: Application) => {
    const apiRouter: Router = Router();
    apiRouter.use('/users', userRouter);

    app.use('/api/v1',cors(), apiRouter);
}
