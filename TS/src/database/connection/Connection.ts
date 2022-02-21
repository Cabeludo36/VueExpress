import sqlite3 from 'sqlite3';

const DATABASE_FILE = 'src/database/connection/database.sqlite';
if(!DATABASE_FILE) 
    throw new Error('DATABASE_FILE não encontrado');

function openConnection() {
    return new sqlite3.Database(DATABASE_FILE);
}
export async function createDataBase() {
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
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL
        );`);
        db.run(`CREATE TABLE IF NOT EXISTS sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            created_at DATETIME NOT NULL,
            updated_at DATETIME NULL,
            deleted_at DATETIME NULL
        );`);
    });
    db.close();
}

export async function getTables():Promise<any[] | any> {
    let query = `SELECT name FROM sqlite_master WHERE type='table'`;
    return await dbQuery(query);
}

export async function dbQueryFirst(query:string, params?:any[]):Promise<any> {
    const retorno:any[] = await dbQuery(query, params);
    return retorno[0];
}

export function dbQuery(query:string, params?:any[]):Promise<any[] | any> {
    let db = openConnection();
    return new Promise<any[]>((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if(err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    })
    .finally(() => {
        db.close();
    })
}