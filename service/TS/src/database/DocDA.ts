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

    public static async create(title:string, description:string, user_id:number): Promise<DocModel | any> {
        let query = `INSERT INTO documents (name, description, texto, user_id, active, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
        let params = [
            title,
            description,
            '',
            user_id,
            true,
            new Date()
        ];
        console.table(params);
        
        await dbQueryFirst(query, params);

        return await dbQueryFirst(`SELECT * FROM documents WHERE id = (SELECT MAX(id) FROM documents)`);
    }

    public static async update(doc: DocModel): Promise<DocModel | any> {
        let query = `UPDATE documents SET texto = ? WHERE id = ?`;
        return await dbQueryFirst(query, [doc.texto, doc.id]);
    }

    public static async delete(id: number): Promise<DocModel | any> {
        let query = `DELETE FROM documents WHERE id = ?`;
        return await dbQueryFirst(query, [id]);
    }
}