import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { setupRoutes } from './routes/routes';
import { setupMiddleware } from './middleware';
import { setupDatabase } from './models';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.EXPRESS_PORT || 5000;

app.use('/images', express.static(path.join(__dirname, 'images')));

setupMiddleware(app);
setupDatabase();
setupRoutes(app);

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
