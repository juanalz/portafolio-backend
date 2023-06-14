import { Sequelize } from 'sequelize';

const db = new Sequelize('portafoliodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db;