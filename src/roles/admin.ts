import type { Context } from "@maxhub/max-bot-api";

export const ADMIN_ROLE = "role:admin";

export async function handleAdminRole(ctx: Context): Promise<void> {
    await ctx.reply("Привет, администратор!");
}
