"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DocDA_1 = __importDefault(require("../database/DocDA"));
class DocBL {
    static async getAll(req, res) {
        try {
            DocDA_1.default.getAll().then((rows) => {
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
    static async getById(req, res) {
        try {
            DocDA_1.default.getById(Number(req.params.id)).then((doc) => {
                res.status(200).json(doc);
            }).catch(() => {
                res.status(404).send("Documento não encontrado");
            });
        }
        catch (error) {
            res.status(400).send("Id inválido");
        }
    }
    static async getByUserId(req, res) {
        try {
            DocDA_1.default.getByUserId(Number(req.params.user_id)).then((docs) => {
                res.status(200).json(docs);
            }).catch(() => {
                res.status(404).send("Documentos não encontrados");
            });
        }
        catch (error) {
            res.status(400).send("Id inválido");
        }
    }
    static async getByName(req, res) {
        try {
            DocDA_1.default.getByName(req.params.name).then((docs) => {
                res.status(200).json(docs);
            }).catch(() => {
                res.status(404).send("Documentos não encontrados");
            });
        }
        catch (error) {
            res.status(400).send("Id inválido");
        }
    }
    static async create(req, res) {
        const doc = req.body;
        console.table(req.body);
        //console.table(doc);
        try {
            DocDA_1.default.create(req.body.titulo, req.body.descricao, req.body.user_id).then((doc) => {
                res.status(200).json(doc);
            }).catch(() => {
                res.status(404).send("Documento não foi possível criar");
            });
        }
        catch (error) {
            res.status(400).send("Algo deu errado ao criar o documento");
        }
    }
    static async update(req, res) {
        try {
            DocDA_1.default.update(req.body).then((doc) => {
                res.status(200).send("Documento atualizado");
            }).catch(() => {
                res.status(404).send("Documento não encontrado");
            });
        }
        catch (error) {
            res.status(400).send("Id inválido");
        }
    }
    static async delete(req, res) {
        try {
            DocDA_1.default.delete(Number(req.params.id)).then((doc) => {
                res.status(200).send("Documento deletado");
            }).catch(() => {
                res.status(404).send("Documento não encontrado");
            });
        }
        catch (error) {
            res.status(400).send("Id inválido");
        }
    }
}
exports.default = DocBL;
