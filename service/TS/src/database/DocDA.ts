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
        let query = `SELECT * FROM documents WHERE name = ?`;
        return await dbQuery(query, [name]);
    }
}