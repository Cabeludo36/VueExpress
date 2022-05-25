import { RoomBL } from '../../logic/RoomBL';
import { Router } from 'express';

export const roomRouter = Router();

roomRouter.get('/getRooms', RoomBL.getAll);
roomRouter.post('/createRoom', RoomBL.create);
roomRouter.patch('/updateRoom/:id', RoomBL.update);
roomRouter.delete('/removeRoom/:id', RoomBL.delete);

