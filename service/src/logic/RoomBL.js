"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomBL = void 0;
const RoomDA_1 = __importDefault(require("../database/RoomDA"));
class RoomBL {
    static getAll(req, res) {
        RoomDA_1.default.getAll().then((rooms) => {
            res.status(200).json(rooms);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    static create(req, res) {
        RoomDA_1.default.create(req.body).then((room) => {
            res.status(200);
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    }
    static update(req, res) {
        RoomDA_1.default.update(Number(req.params.id), req.body).then((room) => {
            res.status(200).json(room);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
    static delete(req, res) {
        RoomDA_1.default.delete(Number(req.params.id)).then((room) => {
            res.status(200).json(room);
        }).catch((error) => {
            res.status(500).json(error);
        });
    }
}
exports.RoomBL = RoomBL;
