import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import mongoose from 'mongoose';
import todosRoutes from './routes/todos.routes.js'; // Add the .js extension

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__filename:', __filename); // Debugging: Print __filename
console.log('__dirname:', __dirname);   // Debugging: Print __dirname

const port = 3001;

main().catch((err) => console.log(err));

async function main() {
    console.log("Bite");

    const app = express();
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    const stylesPath = path.join(__dirname, 'styles');
    console.log('Serving styles from:', stylesPath); // Debugging: Print styles path

    app.use('/styles', express.static(stylesPath, {
        setHeaders: (res, path) => {
            if (path.endsWith('.css')) {
                res.setHeader('Content-Type', 'text/css');
            }
        }
    }));

    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use("/todos", todosRoutes);

    app.get('/', (req, res) => {
        res.render('index', {
            todos: [],
            done: [],
            creationTaskRunning: false
        });
    });
    console.log("Bite");
    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`);
    });
    await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/todos`, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log("Bite 2");
}