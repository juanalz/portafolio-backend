import express, { Application } from 'express';
import db from '../db/connection';

class Server {
    private app: Application;
    private port: string | undefined;

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.dbConection();
        this.middlewares();
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
        // Lectura y Parse del body
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Se está ejecuntando en el puerto: ${this.port}`);
        })
    }
}

export default Server;