import bot from "../bot";
import { runAuth } from "./auth";

bot.command("start", async (ctx) => {
  if (!ctx.from) return;

  // Deep link from the website auth dialog: ?start=auth
  if (ctx.match === "auth") {
    return runAuth(ctx);
  }

  await ctx.reply(
    `Assalomu Alaykum, ${ctx.from.first_name}! 👋\n\nSilvery.uz rasmiy botiga xush kelibsiz.\n\n`,
  );
});
