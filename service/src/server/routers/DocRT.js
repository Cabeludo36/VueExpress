"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.docRouter = void 0;
const express_1 = require("express");
const DocBL_1 = __importDefault(require("../../logic/DocBL"));
exports.docRouter = (0, express_1.Router)();
exports.docRouter.get('/getDocs', DocBL_1.default.getAll);
exports.docRouter.get('/getDoc/:id', DocBL_1.default.getById);
exports.docRouter.get('/getDocsByUser/:user_id', DocBL_1.default.getByUserId);
exports.docRouter.get('/getDocsByName/:name', DocBL_1.default.getByName);
exports.docRouter.post('/create', DocBL_1.default.create);
exports.docRouter.patch('/update/:id', DocBL_1.default.update);
exports.docRouter.delete('/remove/:id', DocBL_1.default.delete);
