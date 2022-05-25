import axios from "axios";
let url: string;
if(window.location.hostname != 'localhost'){
    url = 'http://'+ window.location.hostname +':5000/api/v1/msgs/'
} else {
    url = 'http://localhost:5000/api/v1/msgs/'
}

export type msg = {
    id?: number;
    content: string,
    user_id: number,
    room_id: number,
};

export default class MsgService {

    static getMsgs(room_id: number): Promise<msg[]> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url+'/getRoomMsgs/'+room_id);
                const data = res.data;
                resolve(
                    data.map((msg:msg) => ({
                        ...msg,
                        id: msg.id,
                        content: msg.content,
                        userDeID: msg.user_id,

                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    static postMsg(room: string, content: string, userDeID: number, userParaID: number): Promise<msg> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.post(url+'/postMsg', { room, content, userDeID, userParaID });
                const data = res.data;
                resolve({
                    ...data,
                    id: data.id,
                    content: data.content,
                    userDeID: data.userDeID,
                    userParaID: data.userParaID
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    static createMsg(room: string): Promise<string> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.post(url+'/create', { room });
                const data = res.data;
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

}