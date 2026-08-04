const STORAGE_KEY = "yaadein_daily_reminder";

function getNextReminderDate() {
  const next = new Date();
  next.setHours(9, 0, 0, 0);
  if (next <= new Date()) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

export function getReminder() {
  if (typeof window === "undefined") {
    return { enabled: false, nextNotify: null };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { enabled: false, nextNotify: null };
  }

  try {
    const parsed = JSON.parse(stored);
    return {
      enabled: Boolean(parsed.enabled),
      nextNotify: parsed.nextNotify || null,
    };
  } catch {
    return { enabled: false, nextNotify: null };
  }
}

export function saveReminder(enabled) {
  const nextNotify = enabled ? getNextReminderDate().toISOString() : null;
  const reminder = { enabled, nextNotify };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminder));
  return reminder;
}

export function getNextReminderTime() {
  const reminder = getReminder();
  if (!reminder.enabled || !reminder.nextNotify) {
    return getNextReminderDate();
  }

  const nextNotify = new Date(reminder.nextNotify);
  if (nextNotify <= new Date()) {
    return saveReminder(true).nextNotify
      ? new Date(getReminder().nextNotify)
      : getNextReminderDate();
  }

  return nextNotify;
}
