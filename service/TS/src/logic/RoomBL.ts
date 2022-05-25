import { Request, Response } from "express";
import RoomModel from "../models/RoomModel";
import RoomDA from "../database/RoomDA";

export class RoomBL {
    
    public static getAll(req: Request, res: Response) {
        
        RoomDA.getAll().then(
            (rooms: RoomModel[]) => {
                res.status(200).json(rooms);
            }
        ).catch(
            (error: Error) => {
                res.status(500).json(error);
            }
        );
    }

    public static create(req: Request, res: Response) {
        RoomDA.create(req.body).then(
            (room: RoomModel) => {
                res.status(200);
            }
        ).catch(
            (error: Error) => {
                console.log(error);
                res.status(500).json(error);
            }
        );
    }

    public static update(req: Request, res: Response) {
        RoomDA.update(Number(req.params.id), req.body).then(
            (room: RoomModel) => {
                res.status(200).json(room);
            }
        ).catch(
            (error: Error) => {
                res.status(500).json(error);
            }
        );
    }

    public static delete(req: Request, res: Response) {
        RoomDA.delete(Number(req.params.id)).then(
            (room: RoomModel) => {
                res.status(200).json(room);
            }
        ).catch(
            (error: Error) => {
                res.status(500).json(error);
            }
        );
    }
    
    
}