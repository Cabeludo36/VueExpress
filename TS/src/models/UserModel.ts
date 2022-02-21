export default class UserModel {
    public id: number | undefined;

    public name: string;
    public email: string;
    public password: string;
    
    public created_at: Date | undefined;
    public updated_at: Date | undefined;
    public deleted_at: Date | undefined;
    public active: boolean | undefined;

    constructor(name: string, email: string, password: string, created_at?: Date, updated_at?: Date, deleted_at?: Date, active?: boolean, id?: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.active = active;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}