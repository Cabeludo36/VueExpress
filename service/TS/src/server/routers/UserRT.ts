import { Router } from 'express';
import { UserBL } from '../../logic/UserBL';


export const userRouter = Router();
let userBL = new UserBL();
userRouter.get('/getUsers', userBL.getUsers);
userRouter.get('/getUser/:id', userBL.getUser);
userRouter.post('/login', userBL.getUserLogin);
userRouter.post('/create', userBL.insertUser);
userRouter.patch('/update/:id', userBL.updateUser);
userRouter.delete('/remove/:id', userBL.deleteUser);
