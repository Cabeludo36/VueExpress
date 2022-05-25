"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MsgModel {
    constructor(texto, room_id, user_id, id) {
        this.id = id;
        this.content = texto;
        this.room_id = room_id;
        this.user_id = user_id;
    }
}
exports.default = MsgModel;
