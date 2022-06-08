"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgBL = void 0;
const MsgDA_1 = __importDefault(require("../database/MsgDA"));
class MsgBL {
    static async saveMsg(msg) {
        try {
            await MsgDA_1.default.create(msg);
        }
        catch (error) {
            console.log(error);
        }
    }
    ;
    static getAllRoomMsgs(req, res) {
        MsgDA_1.default.getAllRoomMsgs(Number(req.params.id)).then((msgs) => {
            res.status(200).json(msgs);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    static create(req, res) {
        MsgDA_1.default.create(req.body).then(() => {
            res.status(200);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
}
exports.MsgBL = MsgBL;
