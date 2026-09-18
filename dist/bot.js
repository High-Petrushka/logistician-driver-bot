import { Bot } from "@maxhub/max-bot-api";
import { config } from "dotenv";
config(); // Загрузка переменных из .env файла
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0"; // Отключение проверки сертификата
const bot = new Bot(process.env.BOT_TOKEN); // Создание экземпляра бота
bot.command("start", async (ctx) => {
    await ctx.reply("Добро пожаловать!");
});
bot.hears("ping", async (ctx) => {
    await ctx.reply("pong", {
        link: { type: "reply", mid: ctx.message.body.mid }
    });
});
bot.start();
//# sourceMappingURL=bot.js.map