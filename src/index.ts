import bot from "./bot";

import "./commands/start";
import "./commands/auth";
import "./commands/setPhone";
import "./handlers/contact";

bot.catch((err) => console.error("Bot error:", err.message));

bot.start({ onStart: () => console.log("Silvery bot started!") });
