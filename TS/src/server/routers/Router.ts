import { Application, Router } from "express";
import { userRouter } from "./UserRT";


export const useRoutes = (app: Application) => {
    const apiRouter: Router = Router();
    apiRouter.use('/users', userRouter);

    app.use('/api/v1', apiRouter);
}
