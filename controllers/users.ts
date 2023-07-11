import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import Role from '../models/role';
import User from '../models/user';

export const consultUsers = async(req: Request, res: Response) => {

    const users = await User.findAll({
        attributes: ['id', 'photo', 'names', 'email', 'idRol'],
        include: [{
            model: Role
        }],
        where: {
            state: 1
        }
    });// SELECT * FROM USERS

    res.status(200).json({
        msg: 'Consultar Usuarios',
        users
    })
}

export const consultUserById = async(req: Request, res: Response) => {

    const { id } = req.params;
    const user = await User.findByPk(id);//SELECT * FROM USERS WHERE ID = id
    if (user) {
        res.status(200).json({
            user
        })
    } else {
        res.status(404).json({
            msg: 'El usuario no existe'
        })
    }
}

export const consultUserByNames = async(req: Request, res: Response) => {

    const { names } = req.params;
    const user = await User.findAll({
        where: {
            names
        }
    });

    res.status(200).json({
        user
    })
}

export const saveUsers = async(req: Request, res: Response) => {
    // const { names, email, password, photo, age } = req.body;
    // let idRol = 2;
    // const user = await User.create({names, email, password, photo, age, idRol});

    const { body } = req;
    body.photo = req.file?.filename;
    body.idRol = 2;
    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    body.password = bcrypt.hashSync(body.password, salt);

    const user = await User.create(body);

    res.status(200).json({
        msg: `Se ha registrado un nuevo Usuario con el ID: ${user.dataValues.id}`
    })
}

export const updateUser = async(req: Request, res: Response) => {
    // const _id = req.params.id;
    // const { id, names, email, age } = req.body;

    const { body } = req;
    body.photo = req.file?.filename;
    body.idRol = 2;

    const user = await User.update(body, {
        where: {
            id: body.id
        }
    });

    res.status(200).json({
        msg: `El Usuario con el ID: ${body.id} ha sido actualizado`
    })
}

export const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.params;

    // const arrayIds = [1,3,4];

    // arrayIds.forEach(async function(item) {
    //     await User.destroy({
    //         where: {
    //             id: item
    //         }
    //     });

    // })

    // await User.destroy({
    //     where: {
    //         id
    //     }
    // });
    const state = 0;
    await User.update({state}, {
        where: {
            id
        }
    });

    res.status(200).json({
        msg: `El Usuario con el ID: ${id} ha sido eliminado`
    })
}