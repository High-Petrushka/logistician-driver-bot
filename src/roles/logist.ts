import type { Context } from "@maxhub/max-bot-api";

export const LOGIST_ROLE = "role:logist";

export async function handleLogistRole(ctx: Context): Promise<void> {
    await ctx.reply("Привет, логист!");
}
