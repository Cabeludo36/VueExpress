import axios from "axios";
let url: string;
if(window.location.hostname != 'localhost'){
    url = 'http://'+ window.location.hostname +':5000/api/v1/users/'
} else {
    url = 'http://localhost:5000/api/v1/users/'
}

export type User = {
    id?: number;
    name: string;
    email: string;
    password: string;
    createdA?: string;
    updatedAt?: string;
};
export type UserAuth = {
    email: string,
    password: string
}
export default class UserService {

    static login(email: string , password: string): Promise<User> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.post(url + "/login", { email, password });
                if(res.status === 200)
                    resolve(res.data);
                else
                    reject(res.data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err) {
                reject(err);
            }
        });
    }

    static getUsers(): Promise<User[]> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url+'/getUsers');
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
                const res = await axios.get(`${url}/getUser/${id}`);
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