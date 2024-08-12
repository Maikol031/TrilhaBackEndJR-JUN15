import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const secret = process.env.SECRET;

export const login = async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await UserModel.findByName(name);

        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Usuário inexistente'
            });
        }

        const isPasswordCorrect =  UserModel.comparePassword(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                statusCode: 401,
                message: 'Nome de usuário ou senha incorretos'
            });
        }

        const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, secret, { expiresIn: '15m' });

        res.status(200).json({
            statusCode: 200,
            message: 'Login bem-sucedido',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}