"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRoutes = void 0;
const express_1 = require("express");
const UserRT_1 = require("./UserRT");
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const useRoutes = (app) => {
    const apiRouter = (0, express_1.Router)();
    apiRouter.use((0, cors_1.default)(corsOptions));
    apiRouter.use('/users', UserRT_1.userRouter);
    app.use('/api/v1', (0, cors_1.default)(), apiRouter);
};
exports.useRoutes = useRoutes;
