import { Request, Response } from "express";
import DocDA from "../database/DocDA";
import DocModel from "../models/DocModel";

type DocCreate = {
    name: string;
    description: string;
    user_id: number;
}
export default class DocBL {
    public static async getAll(req:Request, res:Response): Promise<DocModel[] | any> {
        try {
            DocDA.getAll().then((rows) => {
                res.status(200).json(rows);
            }).catch((err) => {
                console.log(err);
                res.status(404).send("Usuários não encontrados");
            });
        } catch (error) {
            res.status(400).send("Algo deu errado ao buscar os usuários");
        }
    }

    public static async getById(req:Request, res:Response): Promise<DocModel[] | any> {
        try {
            DocDA.getById(Number(req.params.id)).then((doc) => {
                res.status(200).json(doc);
            }).catch(() => {
                res.status(404).send("Documento não encontrado");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
    }

    public static async getByUserId(req:Request, res:Response): Promise<DocModel[] | any> {
        try {
            DocDA.getByUserId(Number(req.params.user_id)).then((docs) => {
                res.status(200).json(docs);
            }).catch(() => {
                res.status(404).send("Documentos não encontrados");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
    }

    public static async getByName(req:Request, res:Response): Promise<DocModel[] | any> {
        try {
            DocDA.getByName(req.params.name).then((docs) => {
                res.status(200).json(docs);
            }).catch(() => {
                res.status(404).send("Documentos não encontrados");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
    }

    public static async create(req:Request, res:Response): Promise<DocModel | any> {
        const doc = req.body as DocCreate;
        console.table(req.body);
        //console.table(doc);
        try {
            DocDA.create(req.body.titulo, req.body.descricao, req.body.user_id).then((doc) => {
                res.status(200).json(doc);
            }).catch(() => {
                res.status(404).send("Documento não foi possível criar");
            });
        } catch (error) {
            res.status(400).send("Algo deu errado ao criar o documento");
        }
    }

    public static async update(req:Request, res:Response): Promise<DocModel | any> {
        try {
            DocDA.update(req.body as DocModel).then((doc) => {
                res.status(200).send("Documento atualizado");
            }).catch(() => {
                res.status(404).send("Documento não encontrado");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
    }

    public static async delete(req:Request, res:Response): Promise<DocModel | any> {
        try {
            DocDA.delete(Number(req.params.id)).then((doc) => {
                res.status(200).send("Documento deletado");
            }
            ).catch(() => {
                res.status(404).send("Documento não encontrado");
            });
        } catch (error) {
            res.status(400).send("Id inválido");
        }
    }
}
