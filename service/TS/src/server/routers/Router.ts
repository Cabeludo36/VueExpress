import { Application, Router } from "express";
import { userRouter } from "./UserRT";
import { docRouter } from "./DocRT";
import { msgRouter } from "./MsgRT";
import { roomRouter } from "./RoomRT";
const cors = require('cors')


export const useRoutes = (app: Application) => {
    const apiRouter: Router = Router();
    apiRouter.use('/users', userRouter);
    apiRouter.use('/docs', docRouter);
    apiRouter.use('/msgs', msgRouter);
    apiRouter.use('/rooms', roomRouter);
    
    app.use('/api/v1',cors(), apiRouter);
}
