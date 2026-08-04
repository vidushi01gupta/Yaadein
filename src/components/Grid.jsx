export default function Grid({ guesses = [], current = "", wordLength = 0 }) {
  if (!wordLength) return <div className="window">Loading grid...</div>;

  const maxRows = 6;
  const tileSize = wordLength > 10 ? 32 : wordLength > 6 ? 36 : 42;

  return (
    <div
      className="grid"
      style={{
        fontSize: wordLength > 10 ? "14px" : "18px"
      }}
    >
      {Array.from({ length: maxRows }).map((_, rowIndex) => {
        const guessObj = guesses[rowIndex];
        const guess = guessObj?.word || "";
        const result = guessObj?.res || [];

        return (
          <div key={rowIndex} className="row">
            {Array.from({ length: wordLength }).map((_, colIndex) => {
              let letter = "";
              let status = "";

              if (guessObj) {
                letter = guess[colIndex] || "";
                status = result[colIndex] || "";
              } else if (rowIndex === guesses.length) {
                letter = current[colIndex] || "";
              }

              return (
                <div
                  key={colIndex}
                  className={`tile ${status}`}
                  style={{
                    width: `${tileSize}px`,
                    height: `${tileSize}px`,
                    fontSize: wordLength > 10 ? "14px" : "18px"
                  }}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}