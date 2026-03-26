import { InlineKeyboard } from "grammy";
import bot from "../bot";
import { authenticateUser, callbackUrl } from "../api";
import { getPending, clearPending } from "../state";

bot.on("message:contact", async (ctx) => {
  if (!ctx.from) return;

  const contact = ctx.message.contact;

  if (contact.user_id !== ctx.from.id) {
    await ctx.reply("Iltimos, o'z raqamingizni ulashing.", {
      reply_markup: { remove_keyboard: true },
    });
    return;
  }

  const action = getPending(ctx.from.id);
  if (!action) {
    await ctx.reply(
      "Avval /auth yoki /set_phone buyrug'ini yuboring.",
      { reply_markup: { remove_keyboard: true } }
    );
    return;
  }

  let phone = contact.phone_number;
  if (!phone.startsWith("+")) phone = "+" + phone;

  const name = contact.first_name || ctx.from.first_name || "Foydalanuvchi";

  await ctx.reply("⏳ Tekshirilmoqda...", { reply_markup: { remove_keyboard: true } });

  const { code } = await authenticateUser(ctx.from.id, phone, name);
  clearPending(ctx.from.id);

  await ctx.reply("✅ Muvaffaqiyatli! Saytga qaytish uchun tugmani bosing:", {
    reply_markup: new InlineKeyboard().url("🌐 Saytga o'tish", callbackUrl(code)),
  });
});
