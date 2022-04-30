import { Router } from 'express';
import DocBL from '../../logic/DocBL';

export const docRouter = Router();

docRouter.get('/getDocs', DocBL.getAll);
docRouter.get('/getDoc/:id', DocBL.getById);
docRouter.get('/getDocsByUser/:user_id', DocBL.getByUserId);
docRouter.get('/getDocsByName/:name', DocBL.getByName);
docRouter.post('/create', DocBL.create);
docRouter.patch('/update/:id', DocBL.update);
docRouter.delete('/remove/:id', DocBL.delete);
