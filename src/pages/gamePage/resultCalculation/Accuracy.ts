export const calculateAccuracy = (
  typed: string[],
  originalText: string[],
): number => {
  let correctCharacters = 0;
  let totalCharacters = 0;

  // for correnct word
  typed.forEach((word, index) => {
    const originalWord = originalText[index] || "";
    for (let i = 0; i < Math.min(word.length, originalWord.length); i++) {
      if (word[i] === originalWord[i]) {
        correctCharacters++;
      }
    }
    totalCharacters += word.length;
  });
  correctCharacters += typed.length - 1;
  totalCharacters += typed.length - 1;
  const accuracy = (correctCharacters / totalCharacters) * 100;
  return Math.round(accuracy * 10) / 10;
};
