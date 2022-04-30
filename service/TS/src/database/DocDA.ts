import DocModel from "../models/DocModel";
import { dbQuery, dbQueryFirst } from "./connection/Connection";

export default class DocDA {
    public static async getAll(): Promise<DocModel[] | any> {
        let query = `SELECT * FROM documents`;
        return await dbQuery(query);
    }

    public static async getById(id: number): Promise<DocModel[] | any> {
        let query = `SELECT * FROM documents WHERE id = ?`;
        return await dbQueryFirst(query, [id]);
    }

    public static async getByUserId(user_id: number): Promise<DocModel[] | any> {
        let query = `SELECT * FROM documents WHERE user_id = ?`;
        return await dbQuery(query, [user_id]);
    }

    public static async getByName(name: string): Promise<DocModel[] | any> {
        let query = `SELECT * FROM documents WHERE name LIKE %?%`;
        return await dbQuery(query, [name]);
    }

    public static async create(doc: DocModel): Promise<DocModel | any> {
        let query = `INSERT INTO documents (name, description, texto, user_id, active, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
        return await dbQueryFirst(query, [doc.name, doc.description, doc.texto, doc.user_id, doc.active, doc.created_at]);    
    }

    public static async update(doc: DocModel): Promise<DocModel | any> {
        let query = `UPDATE documents SET name = ?, user_id = ? WHERE id = ?`;
        return await dbQueryFirst(query, [doc.name, doc.user_id, doc.id]);
    }

    public static async delete(id: number): Promise<DocModel | any> {
        let query = `DELETE FROM documents WHERE id = ?`;
        return await dbQueryFirst(query, [id]);
    }
}