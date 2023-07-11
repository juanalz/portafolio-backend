import express, { Application } from 'express';
import cors from 'cors';
import db from '../db/connection';
import userRoutes from '../routes/users';
import authRoutes from '../routes/auth';

class Server {
    private app: Application;
    private port: string | undefined;
    private apiPaths = {
        auth: '/api/auth',
        users: '/api/users',
        projects: '/api/projects'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.dbConection();
        this.middlewares();
        this.routes();
    }

    async dbConection() {
        try {
            await db.authenticate();
            console.log('database online');
        } catch (error) {
            console.log(error);
        }
    }

    middlewares() {
        // Lectura y Parseo del body
        this.app.use(express.json());
        // Permite peticiones desde cualquier dominio o servidor
        this.app.use(cors());
        // this.app.use(cors({
        //     origin: 'http://localhost:5173/'
        // }));

        //Configurar la carpeta estatica
        this.app.use('/uploads', express.static('uploads'))
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Se está ejecuntando en el puerto: ${this.port}`);
        })
    }
}

export default Server;