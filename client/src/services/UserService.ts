import axios from "axios";
const url = "http://localhost:5000/api/v1/users";

export type User = {
    id?: number;
    name: string;
    email: string;
    password: string;
    createdA?: string;
    updatedAt?: string;
};
export default class UserService {
    static getUsers(): Promise<User[]> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map((user:User) => ({
                        ...user,
                        nome: user.name,
                        email: user.email,
                        id: user.id
                    }))
                );
            } catch (err) {
                reject(err);
            }       
        });
    }

    static getUser(id: number): Promise<User> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/${id}`);
                const data = res.data;
                resolve({
                        ...data,
                        nome: data.name,
                        email: data.email,
                        id: data.id
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    static createUser(user: User): Promise<User> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.post(url+'/create', user);
                const data = res.data;
                    resolve({
                        ...data,
                        id: data.id
                    });
            } catch (err) {
                reject(err);
            }
        });
    }
}