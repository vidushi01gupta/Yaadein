const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
];

export default function Keyboard({ onKey, guesses = [] }) {
  const getKeyStatus = (key) => {
    let status = "";

    guesses.forEach((g) => {
      g.word.split("").forEach((letter, i) => {
        if (letter !== key) return;

        if (g.res[i] === "correct") {
          status = "correct";
        } else if (g.res[i] === "present" && status !== "correct") {
          status = "present";
        } else if (!status) {
          status = "absent";
        }
      });
    });

    return status;
  };

  const getSpecialClass = (key, rowIndex) => {
    if (key === "ENTER") return "enter-key";
    if (key === "⌫") return "backspace-key";
    if (rowIndex === 1 && key === "A") return "wide-key";
    return "";
  };

  return (
    <div className="keyboard">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="kb-row">
          {row.map((key) => {
            const status = getKeyStatus(key);
            const specialClass = getSpecialClass(key, rowIndex);

            return (
              <button
                key={key}
                type="button"
                onClick={() => onKey(key)}
                className={`key ${status} ${specialClass}`}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}