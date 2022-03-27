import UserModel from "../models/UserModel";
import { dbQuery, dbQueryFirst } from "./connection/Connection";

export default class UserDA {
    
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Busca um usuário pelo email e senha para login
    */
     public async getUserLogin(email: string, password: string): Promise<UserModel> {
        let query = 'SELECT * FROM users WHERE email = ? AND password = ?;';
        return await dbQueryFirst(query, [email, password]);
    }
    
    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Busca um usuário pelo id
     * @example
     * await userDA.getUser(1);
    */
    public async getUser(id: number): Promise<UserModel> {
        let query = 'SELECT * FROM users WHERE id = ?;';
        return await dbQueryFirst(query, [id]);
    }

    public async getContUsers(): Promise<UserModel> {
        const query = 'SELECT COUNT(*) as total FROM users;';
        return await dbQueryFirst(query);
    }

    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Busca todos os usuários
     * @example
     * await userDA.getUsers();
    */
    public async getUsers(): Promise<UserModel[]> {
        let query = 'SELECT * FROM users WHERE active = ? ORDER BY id DESC;';
        return await dbQuery(query, [true]);
    }

    /**
     * @memberof UserDA
     * @description Insere um usuário e retorna o usuario inserido
     * @example
     * await userDA.updateUser(user);
     * @param {UserModel} user
    */
    public async insertUser(user:UserModel) {
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
        await dbQuery(query, params);
        // Pega o usuario inserido
        let retorno = await dbQueryFirst(`
            SELECT * 
            FROM users
            WHERE ID = (SELECT MAX(ID) FROM users);`
        );

        return await this.getUser(retorno.id);
    }


    /**
     * @returns Promise<{UserModel}>
     * @memberof UserDA
     * @description Atualiza um usuário
     * @example
     * await userDA.updateUser(user, 1);
    */
    public async updateUser(user: UserModel, id: number): Promise<UserModel> {
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
        await dbQuery(query, params);

        let retorno = await this.getUser(id);
        return retorno;
    }

    /**
     * @memberof UserDA
     * @description Deleta um usuário
     * @example
     * await userDA.deleteUser(1);
    */
    public async deleteUser(id: number) {
        let query = 'UPDATE users SET active = ?, deleted_at = ? WHERE id = ?;';
        let params = [
            false,
            new Date(),
            id
        ];
        await dbQuery(query, params);
    }
}
