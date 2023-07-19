import { request, response } from 'express';
import jwt from 'jsonwebtoken';

const validateJWT = (req = request, res = response, next: () => void) => {
    
    const token = req.header('x-token');
    console.log(token)
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        })
    }

    try {
        const resultToken: any = jwt.verify(token, process.env.SECRETORPRIVATEKEY || '')

        req.body.id = resultToken?.id;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }
}

export default validateJWT;