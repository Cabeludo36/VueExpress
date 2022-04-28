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
        let query = `SELECT * FROM documents WHERE name = ?`;
        return await (0, Connection_1.dbQuery)(query, [name]);
    }
}
exports.default = DocDA;
