import { Request, Response } from 'express';
import { Pool } from 'pg';

interface SandwichItem {
    id: number
    sandwich_title: string
    sandwich_price: number
    sandwich_category: string
    image: string;
}

export const getSandwiches = async (req: Request, res: Response) => {
    try {
        const result = await (globalThis.pool as Pool).query<SandwichItem>(`
            SELECT id, name AS sandwich_title, price AS sandwich_price, category AS sandwich_category, image
            FROM sandwiches
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Ошибка запроса к базе данных', err);
        res.status(500).json({ error: 'Не удалось получить данные сэндвичей' });
    }
};