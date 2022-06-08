"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./connection/Connection");
class UserDA {
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Busca um usuário pelo email e senha para login
    */
    async getUserLogin(email, password) {
        let query = 'SELECT * FROM users WHERE email = ? AND password = ?;';
        const resolt = await (0, Connection_1.dbQueryFirst)(query, [email, password]);
        return resolt;
    }
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Busca um usuário pelo id
     * @example
     * await userDA.getUser(1);
    */
    async getUser(id) {
        let query = 'SELECT * FROM users WHERE id = ?;';
        return await (0, Connection_1.dbQueryFirst)(query, [id]);
    }
    async getContUsers() {
        const query = 'SELECT COUNT(*) as total FROM users;';
        return await (0, Connection_1.dbQueryFirst)(query);
    }
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Busca todos os usuários
     * @example
     * await userDA.getUsers();
    */
    async getUsers() {
        let query = 'SELECT * FROM users WHERE active = ? ORDER BY id DESC;';
        return await (0, Connection_1.dbQuery)(query, [true]);
    }
    /**
     * @memberof UserDA
     * @description Insere um usuário e retorna o usuario inserido
     * @example
     * await userDA.updateUser(user);
     * @param {UserModel} user
    */
    async insertUser(user) {
        let query = `
            INSERT INTO users (name, email, password, active, created_at)
            VALUES (?, ?, ?, ?, ?);`;
        let params = [
            user.name,
            user.email,
            user.password,
            true,
            new Date()
        ];
        await (0, Connection_1.dbQuery)(query, params);
        // Pega o usuario inserido
        let retorno = await (0, Connection_1.dbQueryFirst)(`
            SELECT * 
            FROM users
            WHERE ID = (SELECT MAX(ID) FROM users);`);
        return await this.getUser(retorno.id);
    }
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Atualiza um usuário
     * @example
     * await userDA.updateUser(user, 1);
    */
    async updateUser(user, id) {
        let query = `
            UPDATE users SET
                name = ?,
                email = ?,
                password = ?,
                updated_at = ?
            WHERE id = ?;`;
        let params = [
            user.name,
            user.email,
            user.password,
            new Date(),
            id
        ];
        await (0, Connection_1.dbQuery)(query, params);
        let retorno = await this.getUser(id);
        return retorno;
    }
    /**
     * @memberof UserDA
     * @description Deleta um usuário
     * @example
     * await userDA.deleteUser(1);
    */
    async deleteUser(id) {
        let query = 'UPDATE users SET active = ?, deleted_at = ? WHERE id = ?;';
        let params = [
            false,
            new Date(),
            id
        ];
        await (0, Connection_1.dbQuery)(query, params);
    }
}
exports.default = UserDA;
