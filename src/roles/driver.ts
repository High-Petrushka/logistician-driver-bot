import type { Context } from "@maxhub/max-bot-api";

export const DRIVER_ROLE = "role:driver";

export async function handleDriverRole(ctx: Context): Promise<void> {
    await ctx.reply("Привет, водитель!");
}
