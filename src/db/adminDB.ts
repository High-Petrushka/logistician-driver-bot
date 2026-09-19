import { SqlError } from "mariadb";

import { connectToDataBase } from "./commonDB.js";

import { type UserData } from "./types/dbTypes.js";

export async function getUsers(): Promise<UserData[] | undefined> {
    // Открываем соединение
    const conn = await connectToDataBase();
    
    try {
        // Запрашиваем всех пользователей, за исключением того, кто имеет роль "администратор"
        return await conn.query<UserData[]>("SELECT * FROM users WHERE role IN ('логист', 'водитель')");
    } catch (e) {
        console.log(e); // Убрать по завершении работы
        throw SqlError("Unable to perform the query!");
    } finally {
        // Закрываем соединение
        await conn.end();
    }
}

export async function getLogisticians(): Promise<UserData[] | undefined> {
    // Открываем соединение
    const conn = await connectToDataBase();

    try {
        // Запрашиваем всех пользователей, имеющих роль "логист"
        const users = await conn.query<UserData[]>("SELECT * FROM users WHERE role='логист'");
        return users;
    } catch (e) {
        console.log(e); // Убрать по завершении работы
        throw SqlError("Unable to perform the query!");
    } finally {
        // Закрываем соединение
        await conn.end();
    }
}

export async function getDrivers(): Promise<UserData[] | undefined> {
    // Открываем соединение
    const conn = await connectToDataBase();

    try {
        // Запрашиваем всех пользователей, имеющих роль "водитель"
        return await conn.query<UserData[]>("SELECT * FROM users WHERE role='водитель'");
    } catch (e) {
        console.log(e); // Убрать по завершении работы
        throw SqlError("Unable to perform the query!");
    } finally {
        // Закрываем соединение
        await conn.end();
    }
}