"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutes = void 0;
const express_1 = require("express");
const UserRT_1 = require("./UserRT");
const DocRT_1 = require("./DocRT");
const cors = require('cors');
const useRoutes = (app) => {
    const apiRouter = (0, express_1.Router)();
    apiRouter.use('/users', UserRT_1.userRouter);
    apiRouter.use('/docs', DocRT_1.docRouter);
    app.use('/api/v1', cors(), apiRouter);
};
exports.useRoutes = useRoutes;
