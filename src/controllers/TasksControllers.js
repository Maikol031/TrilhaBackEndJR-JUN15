
import { openDB } from "../database/configDB.js"

const getList = async(req, res) => {
    try {
        const db = await openDB()
        const getAll = await db.all('SELECT * FROM tasks')

        return res.status(200).json({
            statusCode: 200,
            data: getAll
        })

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const create = async(req, res) => {
    const {user_id} = req.params
    const {name, description} = req.body
    try {
        if(!name){
            return res.status(400).json({
                statusCode: 400,
                message: "Nome obrigatório"
            });
        }
        
        const db = await openDB()
        const findUser = await db.get('SELECT id FROM users WHERE id = ?', user_id)

        if(!findUser){
            return res.status(404).json({
                statusCode: 404,
                message: "Usuário não encontrado!"
            });
        } 
        await db.run('INSERT INTO tasks (task_name, task_description, user_id) VALUES (?, ?, ?)', [name, description, user_id]);

        return res.status(201).json({
            statusCode: 201,
            message: "Tarefa criada com sucesso",
            task: {
                name,
                description,
                user_id
            }
        })

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

const update = async(req, res) => {
    const {id} = req.params
    const {name, description} = req.body
    try {
        const db = await openDB()

        const existsId = await db.get('SELECT * FROM tasks WHERE id = ?', [id])
        if(!existsId){
            return res.status(400).json({
                statusCode: 400,
                message: "ID inexistente"
            });
        }

        const newDescription = description || existsId.task_description
        const newName = name || existsId.task_name

        await db.run('UPDATE tasks SET task_name = ?, task_description = ? WHERE id = ?', [newName, newDescription, id])

        return res.status(200).json({
            statusCode: 200,
            message: "Tarefa atualizada com sucesso",
            task: {
                id,
                name: newName,
                description: newDescription
            }
        })
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

const deleted = async(req, res) => {
    const {id} = req.params

    try {
        const db = await openDB()

        const existsId = await db.get('SELECT id FROM tasks WHERE ID = ?', [id])
        if(!existsId){
            return res.status(400).json({
                statusCode: 400,
                message: "ID inexistente"
            })
        }

        await db.run('DELETE FROM tasks WHERE ID = ?', [id])
        
        return res.status(200).json({
            statusCode: 200,
            message: "Tarefa deletada com sucesso"
        })

    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: error.message
        })
    }
}

export {getList, create, update, deleted}

