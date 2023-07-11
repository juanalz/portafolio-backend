import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const generateJWT = (id = '') => {

    return new Promise((resolve, reject) => {
        const payload = { id };

        jwt.sign(payload, '3NY0YK3y18@112', {
            expiresIn: '1m'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        })

    });
}

export default generateJWT;