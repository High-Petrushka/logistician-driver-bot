import { createConnection, type Connection } from "mariadb";
import {  config } from "dotenv";

config();

// Функция для подключения к базе данных
// По умолчанию включена в состав прочих функций
export async function connectToDataBase(): Promise<Connection> {
    return await createConnection({
        host: process.env.DB_HOST!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
    });
}