import { Application, Router } from "express";
import { userRouter } from "./UserRT";
import cors from "cors";

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


export const useRoutes = (app: Application) => {
    const apiRouter: Router = Router();
    apiRouter.use(cors(corsOptions))
    apiRouter.use('/users', userRouter);

    app.use('/api/v1', cors(), apiRouter);
}
