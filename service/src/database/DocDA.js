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
    static async create(doc) {
        let query = `INSERT INTO documents (name, description, texto, user_id, active, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
        return await (0, Connection_1.dbQueryFirst)(query, [doc.name, doc.description, doc.texto, doc.user_id, doc.active, doc.created_at]);
    }
    static async update(doc) {
        let query = `UPDATE documents SET name = ?, user_id = ? WHERE id = ?`;
        return await (0, Connection_1.dbQueryFirst)(query, [doc.name, doc.user_id, doc.id]);
    }
    static async delete(id) {
        let query = `DELETE FROM documents WHERE id = ?`;
        return await (0, Connection_1.dbQueryFirst)(query, [id]);
    }
}
exports.default = DocDA;
