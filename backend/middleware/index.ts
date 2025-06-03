import express from 'express';
import cors from 'cors';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export const setupMiddleware = (app: express.Application): void => {
    app.use(cors({
        origin: `http://localhost:3000`,
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, '../../public')));
};