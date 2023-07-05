import { DataTypes } from "sequelize";
import db from "../db/connection";
import Role from "./role";

const User = db.define('User', {
    names: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    photo: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    state: {
        type: DataTypes.INTEGER
    },
    idRol: {
        type: DataTypes.BIGINT
    }
})

User.belongsTo(Role, {
    foreignKey: 'idRol'
})

export default User;