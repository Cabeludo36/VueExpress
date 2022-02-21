"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserModel {
    constructor(name, email, password, created_at, updated_at, deleted_at, active, id) {
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
exports.default = UserModel;
