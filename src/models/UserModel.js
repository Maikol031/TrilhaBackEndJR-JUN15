// models/userModel.js
import bcrypt from 'bcrypt';
import { openDB } from '../database/configDB.js';

export default class UserModel {
    constructor(name, password, role) {
        this.name = name;
        this.password = password;
        this.role = role
    }

    // Método para criar um hash da senha
    async hashPassword() {
        try {
            const salt = 12;
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error) {
            console.error('Erro ao criar hash da senha:', error.message);
            throw error;
        }
    }

    // Método para buscar um usuário pelo nome
    static async findByName(name) {
        try {
            const db = await openDB();
            const user = await db.get('SELECT * FROM users WHERE name = ?', [name]);
            await db.close();
            return user;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error.message);
            throw error;
        }
    }

    // Método para comparar senhas
    static comparePassword(plainPassword, hashedPassword) {
        try {
            return bcrypt.compareSync(plainPassword, hashedPassword);
        } catch (error) {
            console.error('Erro ao comparar senhas:', error.message);
            throw error;
        }
    }
}
