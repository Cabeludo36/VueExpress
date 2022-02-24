"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutes = void 0;
const express_1 = require("express");
const UserRT_1 = require("./UserRT");
const cors = require('cors');
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const useRoutes = (app) => {
    const apiRouter = (0, express_1.Router)();
    apiRouter.use('/users', UserRT_1.userRouter);
    app.use('/api/v1', cors(), apiRouter);
};
exports.useRoutes = useRoutes;