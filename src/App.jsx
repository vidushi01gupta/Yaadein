import { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Keyboard from "./components/Keyboard";
import ResultModal from "./components/ResultModal";
import { getDailyData } from "./utils/getDailyData";
import { checkGuess } from "./utils/checkWord";
import { getStreak, updateStreak } from "./utils/streak";
import { getReminder, saveReminder } from "./utils/reminder";
import HowToPlay from "./components/HowToPlay";
import InstallButton from "./components/InstallButton";
import HintPopup from "./components/HintPopup";

let howToShownThisPageLoad = false;

function App() {
  const [data, setData] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState("playing");
  const [showHowTo, setShowHowTo] = useState(() => {
  if (howToShownThisPageLoad) return false;
  howToShownThisPageLoad = true;
  return true;
});

  const clickSoundRef = useRef(null);
  const [streak, setStreak] = useState(0);
  const [reminderEnabled, setReminderEnabled] = useState(false);

  const [showHintPopup, setShowHintPopup] = useState(false);
  const [revealedHint, setRevealedHint] = useState("");
  const [hintUsed, setHintUsed] = useState(false);
  const [mode, setMode] = useState("daily");


  // Load data once

  useEffect(() => {
  const loadGameData = async () => {
    const gameData = await getDailyData(mode);
    setData(gameData);
  };

  loadGameData();
}, [mode]);


 useEffect(() => {
  const s = getStreak();
  setStreak(s.count);

  const audio = new Audio("/click.mp3");
  audio.volume = 0.4;
  clickSoundRef.current = audio;

  const reminder = getReminder();
  setReminderEnabled(reminder.enabled);
  
}, []);


  useEffect(() => {
  return () => {

    if (clickSoundRef.current) {
      clickSoundRef.current.pause();
      clickSoundRef.current = null;
    }
  };
}, []);

useEffect(() => {
  setGuesses([]);
  setCurrent("");
  setStatus("playing");
  setShowHintPopup(false);
  setRevealedHint("");
  setHintUsed(false);
}, [mode]);

  // Prevent crash
  if (!data || !data.word) return <div className="window">Loading YAADEIN...</div>;
  
  const word = (data?.word || "").toUpperCase();
  const maxTries = 6;

  const playSound = () => {
    const sound = clickSoundRef.current;
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  };


 const handleToggleReminder = async () => {
  console.log("Remind Me clicked");

  if (!window.OneSignalDeferred) {
    alert("OneSignal not loaded");
    return;
  }

  window.OneSignalDeferred.push(async function (OneSignal) {
    try {

      // 🔥 IF ALREADY ENABLED → TURN OFF
      if (reminderEnabled) {
        await OneSignal.User.PushSubscription.optOut();

        saveReminder(false);
        setReminderEnabled(false);

        alert("Reminder cancelled!");
        return;
      }

      // 🔥 ELSE → ENABLE
      await OneSignal.Slidedown.promptPush();

      const permission = OneSignal.Notifications.permission;

      if (permission === true || permission === "granted") {
        await OneSignal.User.PushSubscription.optIn();

        saveReminder(true);
        setReminderEnabled(true);

        alert("Reminder enabled successfully!");
      } else {
        alert("Please allow notifications manually.");
      }

    } catch (err) {
      console.error("OneSignal error:", err);
      alert("OneSignal error. Check console.");
    }
  });
};

  const hasAnyCorrectLetter = (guessList) => {
  return guessList.some(g => g.res.includes("correct"));
};

const generateHint = () => {
  if (data?.hint) return data.hint;

  return `This word belongs to: ${data.category}`;
};
  const handleSubmit = () => {
  if (current.length !== word.length) return;

  const guess = current.toUpperCase();
  const res = checkGuess(guess, word);

  const newGuesses = [...guesses, { word: guess, res }];

  setGuesses(newGuesses);
  setCurrent("");

  // show hint popup after 4th submitted row if still no green letter
  if (
    newGuesses.length === 4 &&
    !hasAnyCorrectLetter(newGuesses) &&
    !hintUsed
  ) {
    setShowHintPopup(true);
  }

  if (guess === word) {
    setStatus("won");

    if (mode === "daily") {
  const updated = updateStreak(data.date, true);
  setStreak(updated.count);
}
  } else if (newGuesses.length >= maxTries) {
    setStatus("lost");
  }
};

const handleRevealHint = () => {
  setRevealedHint(generateHint());
  setHintUsed(true);
};

const handlePlayAgain = async () => {
  const newData = await getDailyData(mode);

  setData(newData);
  setGuesses([]);
  setCurrent("");
  setStatus("playing");
  setShowHintPopup(false);
  setRevealedHint("");
  setHintUsed(false);
};

  const handleKey = (key) => {
  if (status !== "playing") return;

  playSound(); // 🔥 ADD THIS LINE

  if (key === "ENTER") {
    handleSubmit();
  } else if (key === "⌫") {
    setCurrent((prev) => prev.slice(0, -1));
  } else {
    if (current.length < word.length) {
      setCurrent((prev) => prev + key);
    }
  }
};
  return (
    <div className="app">
      <Header
        category={data.category}
        streak={streak}
        reminderEnabled={reminderEnabled}
        mode={mode}
     />
      <div className="mode-switch">
  <button
    className={`mode-btn ${mode === "daily" ? "active" : ""}`}
    onClick={() => setMode("daily")}
    type="button"
  >
    📅 Daily
  </button>

  <button
    className={`mode-btn ${mode === "practice" ? "active" : ""}`}
    onClick={() => setMode("practice")}
    type="button"
  >
    🎮 Practice
  </button>
</div>

      <div className="install-wrap">
      <InstallButton />
    </div>

      <div className="game-area">
  <Grid
    guesses={guesses}
    current={current}
    wordLength={word.length}
  />

  <Keyboard onKey={handleKey} guesses={guesses} />
</div>

      {status !== "playing" && (
        <ResultModal
  data={data}
  guesses={guesses}
  status={status}
  onPlayAgain={handlePlayAgain}
  reminderEnabled={reminderEnabled}
  onToggleReminder={handleToggleReminder}
/>
      )}
      
      {showHowTo && (
  <HowToPlay onClose={() => setShowHowTo(false)} />
)}

{showHintPopup && (
  <HintPopup
    hint={revealedHint}
    onClose={() => setShowHintPopup(false)}
    onReveal={handleRevealHint}
  />
)}
    </div>
  );
}

export default App;