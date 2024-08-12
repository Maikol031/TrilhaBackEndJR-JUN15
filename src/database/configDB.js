import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDB() {
    try {
        const db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        });
        console.log('Conectado ao banco de dados');

        // Criação da tabela 'users'
        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                password TEXT NOT NULL,
                role TEXT CHECK(role IN ('admin', 'user', 'guest'))
            );
        `);

        // Criação da tabela 'tasks'
        await db.exec(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task_name TEXT NOT NULL,
                task_description TEXT,
                user_id INTEGER,
                FOREIGN KEY (user_id) REFERENCES users (id)
            );
        `);
        
        return db;
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados: ', error.message);
        throw error;
    }
}
