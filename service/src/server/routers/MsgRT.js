"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgRouter = void 0;
const MsgBL_1 = require("../../logic/MsgBL");
const express_1 = require("express");
exports.msgRouter = (0, express_1.Router)();
exports.msgRouter.get('/getRoomMsgs/:id', MsgBL_1.MsgBL.getAllRoomMsgs);
exports.msgRouter.post('/createMsg', MsgBL_1.MsgBL.create);
