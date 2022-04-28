export default class DocModel {
    public id: number | undefined;

    public name: string;
    public description: string;
    public texto: string;

    public user_id: number;
    public active: boolean;
    public created_at: Date | undefined;
    public updated_at: Date | undefined;
    public deleted_at: Date | undefined;

    constructor(name: string, description: string, texto: string, user_id: number, active: boolean, created_at?: Date, updated_at?: Date, deleted_at?: Date, id?: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.texto = texto;
        this.user_id = user_id;
        this.active = active;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}