export async function getDailyData(mode = "daily") {
  const res = await fetch("/data/daily.json");
  const data = await res.json();

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata"
  });

  if (mode === "daily") {
    const todayData = data.days[today] || Object.values(data.days)[0];

    return {
      ...todayData,
      date: today,
      refreshTime: data.refreshTime
    };
  }

  const allWords = Object.values(data.days);
  const random = allWords[Math.floor(Math.random() * allWords.length)];

  return {
    ...random,
    date: today,
    refreshTime: data.refreshTime
  };
}