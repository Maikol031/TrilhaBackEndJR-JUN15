import UserModel from "../models/userModel.js";
import { openDB } from "../database/configDB.js";

const create = async(req, res) => {
    const {name, password, role} = req.body;
    try {
        if(!name || !password){
            return res.status(400).json({
                statusCode: 400,
                message: 'Nome e senha são obrigatórios!'
            });
        };

        const existingUser = await UserModel.findByName(name);
        
        if(existingUser){
            return res.status(400).json({
                statusCode: 400,
                message: 'Esse usuário ja está cadastrado!'
            });
        };
        
        const newUser = new UserModel(name, password, role);
        await newUser.hashPassword();

        const db = await openDB();
        await db.run('INSERT INTO users (name, password, role) VALUES (?, ?, ?)', [newUser.name, newUser.password, newUser.role]);
        const result = await db.get('SELECT MAX(id) AS lastId FROM users');
        const findUser = await db.get('SELECT id, name, role FROM users WHERE id = ?', result.lastId);
        
        res.status(201).json({
            statusCode: 201,
            message: 'Usuário criado com sucesso',
            user: {
                id: findUser.id,
                name: findUser.name,
                role: findUser.role
            }
        });

    } catch (error) {
        console.error('Erro ao criar usuário:', error.message);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

const deleteUser = async(req, res) => {
    const {userId} = req.params;
    const {user} = req;
    try {
        const db = await openDB();

        const findUser = await db.get('SELECT id FROM users WHERE id = ?', userId);

        if(!findUser){
            return res.status(404).json({
                statusCode: 404,
                message: "Usuário não encontrado!"
            });
        } 
        if(user.role !== 'admin'){
            return res.status(403).json({
                statusCode: 403,
                message: 'Você não possui privilegios para deletar esse usuario!'
            });
        }

        await db.run('DELETE FROM users WHERE id = ?', userId);

        return res.status(204).json({
            statusCode: 204,
            message: 'Usuário deleteado com sucesso!'
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

const update = async(req, res) => {
    const {userId} = req.params;
    const {name, password, role} = req.body;
    const {user} = req;
    try {
        const db = await openDB();

        const findUser = await db.get('SELECT * FROM users WHERE id = ?', userId);
        
        if(!findUser){
            return res.status(404).json({
                statusCode: 404,
                message: "Usuário não encontrado!"
            });
        }
        if(user.role !== 'admin'){
            return res.status(403).json({
                statusCode: 403,
                message: 'Você não possui privilegios para atualizar esse usuario!'
            });
        }
        const newName = name || findUser.name;
        const newRole = role || findUser.role;
        if(password){
            const userUpdate = new UserModel(newName, password, newRole);
            await userUpdate.hashPassword();
            
            await db.run('UPDATE users SET name = ?, password = ?, role = ? WHERE id = ?', [userUpdate.name, userUpdate.password, userUpdate.role, userId]);
        }else{
            
            await db.run('UPDATE users SET name = ?, role = ? WHERE id = ?', [newName, newRole, userId]);
        }
        
        const data = await db.get('SELECT name, role FROM users WHERE id = ?', userId);

        return res.status(200).json({
            statusCode: 200,
            message: 'Usuário atualizado com sucesso!',
            data
        });

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }

}

const getAll = async(req, res) => {
    const {user} = req;
    try {
        if(user.role !== 'admin'){
            return res.status(403).json({
                statusCode: 403,
                message: 'Você não possui privilegios para listar usuarios!'
            });
        }
        const db = await openDB();
        const allUsers = await db.all('SELECT * FROM users');

        return res.status(200).json({
            statusCode: 200,
            data: allUsers
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

export {create, deleteUser, update, getAll};