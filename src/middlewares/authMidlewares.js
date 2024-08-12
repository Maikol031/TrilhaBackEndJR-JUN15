
import jwt from 'jsonwebtoken';
const authMidleware = (req, res, next) =>{
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            statusCode: 401,
            message: 'Não autorizado!'
        });
    }    

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded
        next();
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: 'Token inválido'
        });
    }
}

export default authMidleware