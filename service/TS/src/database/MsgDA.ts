import MsgModel from '../models/MgsModel';
import { dbQuery, dbQueryFirst } from "./connection/Connection";

export default class MsgDA {

    public static async getAllRoomMsgs(roomId: number): Promise<MsgModel[]> {
        return await dbQuery('SELECT * FROM msg WHERE room_id = ?', [roomId]);
    }

    public static async create(msg: MsgModel): Promise<void> {
        let params = [msg.room_id, msg.user_id, msg.content, Date(), true];
        await dbQuery('INSERT INTO msg (room_id, user_id, content, created_at, active) VALUES (?, ?, ?, ?, ?)', params);
    }

}