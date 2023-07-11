import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';
import generateJWT from '../helpers/generate-jwt';

const login = async(req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // Verificar si el email existe
        const login = await User.findOne({
            where: {
                email
            }
        })

        if (!login) {
            return res.status(400).json({
                msg: 'El usuario no está registrado.'
            });
        }

        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, login.dataValues.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            });
        }
        
        // Si el usuario está activo
        if (!login.dataValues.state) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos'
            });
        } 
        
         // Generar el JWT
         const token = await generateJWT(login.dataValues.id);
         console.log(token)
         return res.status(200).json({
            token
        });
        
    } catch (error) {
        
    }

}

export default login;