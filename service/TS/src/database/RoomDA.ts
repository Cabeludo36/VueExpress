import RoomModel from '../models/RoomModel';
import { dbQuery, dbQueryFirst } from "./connection/Connection";

export default class RoomDA {
    
        public static async getAll(): Promise<RoomModel[]> {
            return await dbQuery('SELECT * FROM rooms');
        }
    
        public static async create(room: RoomModel): Promise<RoomModel> {
            let params = [room.name, room.description, room.user_id, room.active, Date()];
            return await dbQuery('INSERT INTO rooms (name, description, user_id, active, created_at) VALUES (?, ?, ?, ?, ?)', params);
        }
    
        public static async update(id: number, room: RoomModel): Promise<RoomModel> {
            let params = [room.name, room.description, room.user_id, id];
            return await dbQueryFirst('UPDATE rooms SET name = ?, description = ?, user_id = ? WHERE id = ?', params);
        }
    
        public static async delete(id: number): Promise<RoomModel> {
            return await dbQueryFirst('DELETE FROM rooms WHERE id = ?', [id]);
        }
    
    
}