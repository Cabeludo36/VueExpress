import { MsgBL } from '../../logic/MsgBL';
import { Router } from 'express';

export const msgRouter = Router();

msgRouter.get('/getRoomMsgs/:id', MsgBL.getAllRoomMsgs);
msgRouter.post('/createMsg', MsgBL.create);
