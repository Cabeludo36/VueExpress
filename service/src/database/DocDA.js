"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./connection/Connection");
class DocDA {
    static async getAll() {
        let query = `SELECT * FROM documents`;
        return await (0, Connection_1.dbQuery)(query);
    }
    static async getById(id) {
        let query = `SELECT * FROM documents WHERE id = ?`;
        return await (0, Connection_1.dbQueryFirst)(query, [id]);
    }
    static async getByUserId(user_id) {
        let query = `SELECT * FROM documents WHERE user_id = ?`;
        return await (0, Connection_1.dbQuery)(query, [user_id]);
    }
    static async getByName(name) {
        let query = `SELECT * FROM documents WHERE name LIKE %?%`;
        return await (0, Connection_1.dbQuery)(query, [name]);
    }
    static async create(title, description, user_id) {
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
        await (0, Connection_1.dbQueryFirst)(query, params);
        return await (0, Connection_1.dbQueryFirst)(`SELECT * FROM documents WHERE id = (SELECT MAX(id) FROM documents)`);
    }
    static async update(doc) {
        let query = `UPDATE documents SET texto = ? WHERE id = ?`;
        return await (0, Connection_1.dbQueryFirst)(query, [doc.texto, doc.id]);
    }
    static async delete(id) {
        let query = `DELETE FROM documents WHERE id = ?`;
        return await (0, Connection_1.dbQueryFirst)(query, [id]);
    }
}
exports.default = DocDA;
