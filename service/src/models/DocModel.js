"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DocModel {
    constructor(name, description, texto, user_id, active, created_at, updated_at, deleted_at, id) {
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
exports.default = DocModel;
