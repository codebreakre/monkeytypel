export const calculateWPM = (
  typed: string[],
  originalText: string[],
  timeInSeconds: number,
): number => {
  let letterCount = 0;
  typed.forEach((word, index) => {
    const originalWord = originalText[index] || ''; 
    for (let i = 0; i < Math.min(word.length, originalWord.length); i++) {
      if (word[i] === originalWord[i]) {
        letterCount++;
      }
    }
  });
  letterCount += typed.length - 1;
  const wordsTyped = letterCount / 5;
  const wpm = (wordsTyped / timeInSeconds) * 60;
  return Math.round(wpm * 10) / 10;
};
