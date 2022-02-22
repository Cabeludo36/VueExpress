import axios from "axios";

const url = "http://localhost:5000/api/v1/users";

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
};

export default class UserService {
    static getUsers() {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                console.log(data);
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
}