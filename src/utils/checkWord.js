export function checkGuess(guess = "", word = "") {
  guess = guess.toUpperCase();
  word = word.toUpperCase();

  const result = Array(word.length).fill("absent");
  const freq = {};

  // build frequency map
  for (let char of word) {
    freq[char] = (freq[char] || 0) + 1;
  }

  // correct positions
  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      result[i] = "correct";
      freq[guess[i]]--;
    }
  }

  // present letters
  for (let i = 0; i < word.length; i++) {
    if (result[i] === "correct") continue;

    const char = guess[i];

    if (char && freq[char] > 0) {
      result[i] = "present";
      freq[char]--;
    }
  }

  return result;
}