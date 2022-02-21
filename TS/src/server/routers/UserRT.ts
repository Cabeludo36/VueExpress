import { Router } from 'express';
import { UserBL } from '../../logic/UserBL';


export const userRouter = Router();
let userBL = new UserBL();
userRouter.get('/', userBL.getUsers);
userRouter.get('/:id', userBL.getUser);
userRouter.post('/create', userBL.insertUser);
userRouter.put('/update/:id', userBL.updateUser);
userRouter.put('/remove/:id', userBL.deleteUser);
