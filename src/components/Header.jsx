export default function Header({ category, streak = 0, reminderEnabled = false , mode}) {
  return (
    <>
      <div className="title-bar">
        <span>🖥️ YAADEIN</span>

        <div className="title-right">
          <span>🔥 {streak}</span>
          <span>{reminderEnabled ? "🔔 On" : "🔕 Off"}</span>
        </div>
      </div>

      <div className="header">
  <div className="title-text">📺 Bujho toh jaane!:</div>

  <div className="category-text">{category}</div>

  {mode === "practice" && (
    <div className="mode-text">🎮 Practice Mode</div>
  )}
</div>
    </>
  );
}