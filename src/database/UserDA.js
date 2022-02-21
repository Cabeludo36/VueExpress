"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connection_1 = require("./connection/Connection");
class UserDA {
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Busca um usuário pelo id
     * @example
     * await userDA.getUser(1);
    */
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT * FROM users WHERE id = ?;';
            return yield (0, Connection_1.dbQueryFirst)(query, [id]);
        });
    }
    getContUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT COUNT(*) as total FROM users;';
            return yield (0, Connection_1.dbQueryFirst)(query);
        });
    }
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Busca todos os usuários
     * @example
     * await userDA.getUsers();
    */
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'SELECT * FROM users WHERE active = ? ORDER BY id DESC;';
            return yield (0, Connection_1.dbQuery)(query, [true]);
        });
    }
    /**
     * @memberof UserDA
     * @description Insere um usuário e retorna o usuario inserido
     * @example
     * await userDA.updateUser(user);
     * @param {UserModel} user
    */
    insertUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield (0, Connection_1.dbQuery)(query, params);
            // Pega o usuario inserido
            let retorno = yield (0, Connection_1.dbQueryFirst)(`
            SELECT * 
            FROM users
            WHERE ID = (SELECT MAX(ID) FROM users);`);
            return yield this.getUser(retorno.id);
        });
    }
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Atualiza um usuário
     * @example
     * await userDA.updateUser(user, 1);
    */
    updateUser(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield (0, Connection_1.dbQuery)(query, params);
            let retorno = yield this.getUser(id);
            return retorno;
        });
    }
    /**
     * @memberof UserDA
     * @description Deleta um usuário
     * @example
     * await userDA.deleteUser(1);
    */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = 'UPDATE users SET active = ?, deleted_at = ? WHERE id = ?;';
            let params = [
                false,
                new Date(),
                id
            ];
            yield (0, Connection_1.dbQuery)(query, params);
        });
    }
}
exports.default = UserDA;
