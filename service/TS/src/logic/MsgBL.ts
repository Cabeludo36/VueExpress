import { Request, Response } from "express";
import MsgModel from "../models/MgsModel";
import MsgDA from "../database/MsgDA";

export class MsgBL {
    public static async saveMsg(msg: MsgModel) {
        try {
            await MsgDA.create(msg);
        }
        catch (error) {
            console.log(error);
        }
    };

    public static getAllRoomMsgs(req: Request, res: Response) {
        MsgDA.getAllRoomMsgs(Number(req.params.id)).then(
            (msgs: MsgModel[]) => {
                res.status(200).json(msgs);
            }
        ).catch(
            (error: Error) => {
                res.status(500).json(error);
            }
        );
    }

    public static create(req: Request, res: Response) {
        MsgDA.create(req.body).then(
            () => {
                res.status(200);
            }
        ).catch(
            (error: Error) => {
                res.status(500).json(error);
            }
        );
    }
    
}