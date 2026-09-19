import { type UserData } from "../db/types/dbTypes.js";

// Преобразует список пользователей в строку
export function makeUserList(userData: UserData[]): string {
    let result = "";

    for (let i = 0; i < userData.length; i++) {
        result += `${i+1}. ${userData[i]?.name} - ${userData[i]?.role}\n`;
    }

    return result;
}