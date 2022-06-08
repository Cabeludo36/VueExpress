"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./connection/Connection");
class RoomDA {
    static async getAll() {
        return await (0, Connection_1.dbQuery)('SELECT * FROM rooms');
    }
    static async create(room) {
        let params = [room.name, room.description, room.user_id, room.active, Date()];
        return await (0, Connection_1.dbQuery)('INSERT INTO rooms (name, description, user_id, active, created_at) VALUES (?, ?, ?, ?, ?)', params);
    }
    static async update(id, room) {
        let params = [room.name, room.description, room.user_id, id];
        return await (0, Connection_1.dbQueryFirst)('UPDATE rooms SET name = ?, description = ?, user_id = ? WHERE id = ?', params);
    }
    static async delete(id) {
        return await (0, Connection_1.dbQueryFirst)('DELETE FROM rooms WHERE id = ?', [id]);
    }
}
exports.default = RoomDA;
