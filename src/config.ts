import "dotenv/config";

const config = {
  botToken: process.env.TELEGRAM_BOT_TOKEN!,
  botSecret: process.env.TELEGRAM_BOT_SECRET!,
  siteUrl: (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
};

if (!config.botToken) throw new Error("TELEGRAM_BOT_TOKEN is not set");
if (!config.botSecret) throw new Error("TELEGRAM_BOT_SECRET is not set");
if (!config.siteUrl) throw new Error("SITE_URL is not set");

export default config;
