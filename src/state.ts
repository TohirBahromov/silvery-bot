export type PendingAction = "auth" | "set-phone";

const pending = new Map<number, PendingAction>();

export function setPending(chatId: number, action: PendingAction): void {
  pending.set(chatId, action);
}

export function getPending(chatId: number): PendingAction | undefined {
  return pending.get(chatId);
}

export function clearPending(chatId: number): void {
  pending.delete(chatId);
}
