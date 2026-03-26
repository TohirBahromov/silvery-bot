import config from "./config";

export type CheckUserResult =
  | { found: false }
  | { found: true; phone: string | null; code: string };

export async function checkUser(telegramId: number): Promise<CheckUserResult> {
  const res = await fetch(`${config.siteUrl}/api/auth/telegram/check-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-bot-secret": config.botSecret,
    },
    body: JSON.stringify({ telegram_id: telegramId }),
  });
  if (!res.ok) throw new Error(`check-user failed: ${res.status}`);
  return res.json();
}

export async function authenticateUser(
  telegramId: number,
  phone: string,
  name: string
): Promise<{ code: string }> {
  const res = await fetch(`${config.siteUrl}/api/auth/telegram/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-bot-secret": config.botSecret,
    },
    body: JSON.stringify({ telegram_id: telegramId, phone, name }),
  });
  if (!res.ok) throw new Error(`auth failed: ${res.status}`);
  return res.json();
}

export function callbackUrl(code: string): string {
  return `${config.siteUrl}/api/auth/telegram-callback?code=${encodeURIComponent(code)}`;
}
