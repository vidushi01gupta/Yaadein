export function getStreak() {
  const data = localStorage.getItem("yaadein_streak");
  return data ? JSON.parse(data) : { count: 0, lastPlayed: null };
}

export function updateStreak(today, didWin) {
  const streak = getStreak();

  if (!didWin) {
    const newStreak = { count: 0, lastPlayed: today };
    localStorage.setItem("yaadein_streak", JSON.stringify(newStreak));
    return newStreak;
  }

  const newCount = streak.count + 1;
  const newStreak = { count: newCount, lastPlayed: today };
  localStorage.setItem("yaadein_streak", JSON.stringify(newStreak));
  return newStreak;
}