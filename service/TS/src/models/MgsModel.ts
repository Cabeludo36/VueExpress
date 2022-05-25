
export default class MsgModel {

    public id: number | undefined;
    
    public room_id: number;
    public content: string;
    public user_id: number;

    constructor(texto: string, room_id: number, user_id:number, id?: number) {
        this.id = id;
        this.content = texto;
        this.room_id = room_id;
        this.user_id = user_id;
        
    }
}