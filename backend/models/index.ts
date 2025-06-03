import { Pool } from 'pg';

declare global {
    var pool: Pool;
}

export const setupDatabase = (): void => {
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT),
    });

    globalThis.pool = pool;
};