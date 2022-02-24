"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Router_1 = require("./routers/Router");
const body_parser_1 = __importDefault(require("body-parser"));
const Connection_1 = require("../database/connection/Connection");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
(0, Router_1.useRoutes)(app);
(0, Connection_1.createDataBase)();
app.listen(PORT, () => console.log('Rodando em http://localhost:' + PORT + '/api/v1/users'));
