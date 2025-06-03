import { Application } from 'express';
import productRouter from './productRouter';

export function setupRoutes(app: Application) {
    app.use('/product', productRouter);

}
