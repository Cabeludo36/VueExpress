"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbQuery = exports.dbQueryFirst = exports.getTables = exports.createDataBase = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const DATABASE_FILE = 'src/database/connection/database.sqlite';
if (!DATABASE_FILE)
    throw new Error('DATABASE_FILE não encontrado');
function openConnection() {
    return new sqlite3_1.default.Database(DATABASE_FILE);
}
async function createDataBase() {
    let db = openConnection();
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            password TEXT NOT NULL,
            active BOOLEAN NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL
        );`);
        db.run(`CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            texto TEXT NOT NULL,

            user_id INTEGER NOT NULL,
            active BOOLEAN NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS rooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            user_id INTEGER NOT NULL,
            active BOOLEAN NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL,

            FOREIGN KEY(user_id) REFERENCES users(id)
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS msg (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            room_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME NOT NULL,
            active BOOLEAN NOT NULL,

            FOREIGN KEY (room_id) REFERENCES rooms(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);
    });
    db.close();
}
exports.createDataBase = createDataBase;
async function getTables() {
    let query = 'SELECT * FROM rooms'; //`SELECT name FROM sqlite_master WHERE type='table'`;
    return await dbQuery(query);
}
exports.getTables = getTables;
async function dbQueryFirst(query, params) {
    const retorno = await dbQuery(query, params);
    return retorno[0];
}
exports.dbQueryFirst = dbQueryFirst;
function dbQuery(query, params) {
    let db = openConnection();
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows);
            }
        });
    })
        .finally(() => {
        db.close();
    });
}
exports.dbQuery = dbQuery;
