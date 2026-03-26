import { Context, InlineKeyboard, Keyboard } from "grammy";
import bot from "../bot";
import { checkUser, callbackUrl } from "../api";
import { setPending } from "../state";

export async function runAuth(ctx: Context): Promise<void> {
  if (!ctx.from) return;

  const result = await checkUser(ctx.from.id);

  if (result.found) {
    await ctx.reply(
      `✅ Ro'yxatdan o'tdingiz.\nAmaldagi raqamingiz: ${result.phone ?? "noma'lum"}\n\nSaytga qaytish uchun tugmani bosing:`,
      {
        reply_markup: new InlineKeyboard().url(
          "🌐 Saytga kirish",
          callbackUrl(result.code),
        ),
      },
    );
  } else {
    setPending(ctx.from.id, "auth");
    await ctx.reply("Saytga kirish uchun telefon raqamingizni ulashing:", {
      reply_markup: new Keyboard()
        .requestContact("📱 Telefon raqamni ulashish")
        .resized()
        .oneTime(),
    });
  }
}

bot.command("auth", runAuth);
