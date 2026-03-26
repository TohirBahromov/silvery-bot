import { Keyboard } from "grammy";
import bot from "../bot";
import { setPending } from "../state";

bot.command("set_phone", async (ctx) => {
  if (!ctx.from) return;

  setPending(ctx.from.id, "set-phone");

  await ctx.reply("Yangi telefon raqamingizni ulashing:", {
    reply_markup: new Keyboard()
      .requestContact("📱 Raqamni yangilash")
      .resized()
      .oneTime(),
  });
});
