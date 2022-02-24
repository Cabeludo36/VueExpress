"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBL = void 0;
const UserDA_1 = __importDefault(require("../database/UserDA"));
class UserBL {
    getUser(req, res) {
        let userDA = new UserDA_1.default();
        try {
            userDA.getUser(Number(req.params.id)).then((user) => {
                res.status(200).json(user);
            }).catch(() => {
                res.status(404).send("Usuário não encontrado");
            });
        }
        catch (error) {
            res.status(400).send("Id inválido");
        }
    }
    getUsers(req, res) {
        let userDA = new UserDA_1.default();
        try {
            userDA.getUsers().then((rows) => {
                res.status(200).json(rows);
            }).catch((err) => {
                console.log(err);
                res.status(404).send("Usuários não encontrados");
            });
        }
        catch (error) {
            res.status(400).send("Algo deu errado ao buscar os usuários");
        }
    }
    insertUser(req, res) {
        let userDA = new UserDA_1.default();
        let userModel = req.body;
        console.log(req.body);
        try {
            userDA.insertUser(userModel).then((rows) => {
                console.log(rows);
                res.status(200).json(rows);
            }).catch((err) => {
                console.log(err);
                res.status(404).send("Usuário não inserido");
            });
        }
        catch (error) {
            res.status(400).send("Algo deu errado ao inserir o usuário");
        }
    }
    updateUser(req, res) {
        let userDA = new UserDA_1.default();
        try {
            userDA.updateUser(req.body, Number(req.params.id)).then((user) => {
                res.status(200).json(user);
            }).catch(() => {
                res.status(404).send("Usuário não encontrado");
            });
        }
        catch (error) {
            res.status(400).send("Id inválido");
        }
    }
    deleteUser(req, res) {
        let userDA = new UserDA_1.default();
        try {
            userDA.deleteUser(Number(req.params.id)).then(() => {
                res.status(200).send("Usuário deletado");
            }).catch(() => {
                res.status(404).send("Usuário não encontrado");
            });
        }
        catch (error) {
            res.status(400).send("Id inválido");
        }
    }
}
exports.UserBL = UserBL;
