import axios from "axios";
let url: string;
if(window.location.hostname != 'localhost'){
    url = 'http://'+ window.location.hostname +':5000/api/v1/rooms/'
} else {
    url = 'http://localhost:5000/api/v1/rooms/'
}


export type room = {
    id?: number;
    name: string,
    description: string,
    user_id: number,
    active: boolean,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date,
};


export default class RoomService {
    
    static getRooms(): Promise<room[]> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.get(url+'/getRooms');
                const data = res.data;
                resolve(
                    data.map((room:room) => ({
                        ...room,
                        id: room.id,
                        name: room.name,
                        description: room.description,
                        user_id: room.user_id,
                        active: room.active,
                        created_at: room.created_at,
                        updated_at: room.updated_at,
                        deleted_at: room.deleted_at,
                    }))
                );
            } catch (err) {
                reject(err);
            }
        });
    }

    static createRoom(name: string, description: string, user_id: number, active: boolean): Promise<room> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.post(url+'/createRoom', { name, description, user_id, active });
                const data = res.data;
                resolve({...data});
            } catch (err) {
                reject(err);
            }
        });
    }
    static updateRoom(id: number, name: string, description: string, user_id: number, active: boolean): Promise<room> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.patch(url+'/updateRoom/'+id, { name, description, user_id, active });
                const data = res.data;
                resolve({
                    ...data,
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    user_id: data.user_id,
                    active: data.active,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    deleted_at: data.deleted_at,
                });
            } catch (err) {
                reject(err);
            }
        });
    }
    static deleteRoom(id: number): Promise<room> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise( async (resolve, reject) => {
            try {
                const res = await axios.delete(url+'/deleteRoom/'+id);
                const data = res.data;
                resolve({
                    ...data,
                    id: data.id,
                    name: data.name,
                    description: data.description,
                    user_id: data.user_id,
                    active: data.active,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    deleted_at: data.deleted_at,
                });
            } catch (err) {
                reject(err);
            }
        });
    }

}