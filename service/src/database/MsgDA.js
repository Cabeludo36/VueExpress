"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./connection/Connection");
class MsgDA {
    static async getAllRoomMsgs(roomId) {
        return await (0, Connection_1.dbQuery)('SELECT * FROM msg WHERE room_id = ?', [roomId]);
    }
    static async create(msg) {
        let params = [msg.room_id, msg.user_id, msg.content, Date(), true];
        await (0, Connection_1.dbQuery)('INSERT INTO msg (room_id, user_id, content, created_at, active) VALUES (?, ?, ?, ?, ?)', params);
    }
}
exports.default = MsgDA;
