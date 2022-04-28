import axios from "axios";
let url: string;
if(window.location.hostname != 'localhost'){
    url = 'http://'+ window.location.hostname +':5000/api/v1/docs/'
} else {
    url = 'http://localhost:5000/api/v1/docs/'
}

export type Documento = {
    id?: number;
    name : string,
    description: string,
    texto: string
    user_id: number,
    created_at?: Date,
    updated_at?: Date
};

export default class DocService {
    static getDocs(): Promise<Documento[]> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url+'/getDocs');
                const data = res.data;
                resolve(
                    data.map((doc:Documento) => ({
                        ...doc,
                        nome: doc.name,
                        descricao: doc.description,
                        id: doc.id
                    }))
                );
            } catch (err) {
                reject(err);
            }       
        });
    }

    static getDoc(id: number): Promise<Documento> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}/getDoc/${id}`);
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
}