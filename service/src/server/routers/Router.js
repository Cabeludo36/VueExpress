"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutes = void 0;
const express_1 = require("express");
const UserRT_1 = require("./UserRT");
const DocRT_1 = require("./DocRT");
const MsgRT_1 = require("./MsgRT");
const RoomRT_1 = require("./RoomRT");
const cors = require('cors');
const useRoutes = (app) => {
    const apiRouter = (0, express_1.Router)();
    apiRouter.use('/users', UserRT_1.userRouter);
    apiRouter.use('/docs', DocRT_1.docRouter);
    apiRouter.use('/msgs', MsgRT_1.msgRouter);
    apiRouter.use('/rooms', RoomRT_1.roomRouter);
    app.use('/api/v1', cors(), apiRouter);
};
exports.useRoutes = useRoutes;
