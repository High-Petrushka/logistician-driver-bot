import { Bot, Keyboard } from "@maxhub/max-bot-api";
import { config } from "dotenv";
import { setTimeout as delay } from "node:timers/promises";
import { DRIVER_ROLE, handleDriverRole } from "./roles/driver.js";
import { ADMIN_ROLE, handleAdminRole } from "./roles/admin.js";
import { LOGIST_ROLE, handleLogistRole } from "./roles/logist.js";
config();
const token = process.env.MAX_BOT_TOKEN;
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const apiUrl = process.env.MAX_API_URL ?? "https://platform-api2.max.ru";
if (!token) {
    throw new Error("MAX_BOT_TOKEN is not set. Add the bot token to .env before starting the bot.");
}
const bot = new Bot(token, {
    clientOptions: { baseUrl: apiUrl },
});
const commands = [
    { name: "start", description: "Начать работу с ботом" },
    { name: "id", description: "Получить свой user_id" },
    { name: "help", description: "Показать доступные команды" },
    { name: "clear", description: "Удалить сообщения бота в этом чате" },
];
const roleKeyboard = Keyboard.inlineKeyboard([
    [Keyboard.button.callback("Администратор", ADMIN_ROLE)],
    [Keyboard.button.callback("Логист", LOGIST_ROLE)],
    [Keyboard.button.callback("Водитель", DRIVER_ROLE)],
]);
const sendWelcomeMessage = async (ctx) => {
    await ctx.reply("Добро пожаловать! Выберите вашу роль:", {
        attachments: [roleKeyboard],
    });
};
const acknowledgeCallback = async (ctx) => {
    await ctx.answerOnCallback({ message: { text: "Готово" } });
};
const sendHelpMessage = async (ctx) => {
    await ctx.reply([
        "Доступные команды:",
        "/start — начать работу",
        "/id — получить свой user_id",
        "/help — показать это меню",
        "/clear — удалить сообщения бота в этом чате",
    ].join("\n"));
};
const sendUserId = async (ctx) => {
    const userId = ctx.message?.sender?.user_id;
    await ctx.reply(userId === undefined
        ? "Не удалось определить ID пользователя."
        : `Ваш user_id: ${userId}`);
};
const clearBotMessages = async (ctx) => {
    const botId = ctx.myId;
    if (botId === undefined) {
        await ctx.reply("Не удалось определить ID бота.");
        return;
    }
    const { messages } = await ctx.getMessages({ count: 100 });
    const botMessages = messages.filter((message) => message.sender?.user_id === botId);
    for (const message of botMessages) {
        await ctx.api.deleteMessage(message.body.mid);
        await delay(500);
    }
    await ctx.reply(`Удалено сообщений бота: ${botMessages.length}.\n`
        + "Сообщения пользователя MAX не позволяет удалять ботам в личном диалоге.");
};
// Системный запуск и команда /start.
bot.on("bot_started", sendWelcomeMessage);
bot.command("start", sendWelcomeMessage);
const registerRoleAction = (payload, handler) => {
    bot.action(payload, async (ctx) => {
        await acknowledgeCallback(ctx);
        await handler(ctx);
    });
};
// Кнопки ролей передают управление в свои модули.
registerRoleAction(ADMIN_ROLE, handleAdminRole);
registerRoleAction(LOGIST_ROLE, handleLogistRole);
registerRoleAction(DRIVER_ROLE, handleDriverRole);
// Текстовые команды.
bot.command("id", sendUserId);
bot.command("help", sendHelpMessage);
bot.command("clear", clearBotMessages);
const startBot = async () => {
    await bot.api.setMyCommands(commands);
    await bot.start();
};
startBot().catch((error) => {
    console.error("Failed to start MAX bot:", error);
    process.exitCode = 1;
});
//# sourceMappingURL=bot.js.map