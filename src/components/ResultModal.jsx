import { useState, useRef } from "react";
import { generateShare } from "../utils/share";

export default function ResultModal({
  data,
  guesses,
  status,
  onPlayAgain,
  reminderEnabled,
  onToggleReminder,
}) {
  const [showMemory, setShowMemory] = useState(false);

  const openSoundRef = useRef(new Audio("/click.mp3"));

  const text = generateShare(guesses, data.date);

  const isWin =
    guesses[guesses.length - 1]?.word === data.word;

  const handleShare = () => {
    const shareData = {
      title: "YAADEIN",
      text,
      url: window.location.origin,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text)}`
      );
    }
  };

  const handleWhatsAppShare = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const openMemory = () => {
    const sound = openSoundRef.current;
    sound.currentTime = 0;
    sound.play().catch(() => {});
    setShowMemory(true);
  };

  return (
    <>
      <div className="modal-overlay fade-in">
        <div className="modal">

          <h2>
            {isWin ? "🎉 Shabash! Bilkul sahi!" : "😢 Word miss ho gaya!"}
          </h2>

          {!isWin && <p>Correct word: {data.word}</p>}

          <button className="btn-primary" onClick={openMemory}>
            📺 Yaad Kholo!
          </button>

          <button className="btn-secondary" onClick={handleShare}>
            📤 Share karo!
          </button>

          <button
  className="btn-secondary"
  onClick={onToggleReminder}
  type="button"
>
  {reminderEnabled ? "🔕 Cancel Reminder" : "🔔 Remind Me"}
</button> 


          <button onClick={onPlayAgain}>
  🎮 Play Again
</button>

        </div>
      </div>

      {/* 🧠 MEMORY CARD */}
      {showMemory && (
        <div className="memory-overlay fade-in">
          <div className="memory-card">

            <div className="memory-title">
              📺 Yaadein Memory Card
              <button onClick={() => setShowMemory(false)}>X</button>
            </div>

            <div className="memory-content">

              {/* 🎴 IMAGE */}
              <img
                src={data.image}
                alt="memory"
                className="memory-img"
              />

              <p>{data.trivia}</p>

            </div>
          </div>
        </div>
      )}

    </>
  );
}