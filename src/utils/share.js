export function generateShare(guesses, date) {

  const url =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://theindianalmanac-yaadein-play.vercel.app/";

  const instaUrl = "https://www.instagram.com/theindianalmanac?igsh=MTFlMm9hajVzc2pnZQ==";

  return `🎮 YAADEIN 

Relive 90s memories!
Play: ${url}

For more memories 👇
Visit: ${instaUrl}`;
}
