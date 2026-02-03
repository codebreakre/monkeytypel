export const calculateConsistency = (wpmOverTime: number[]): number => {
  if (wpmOverTime.length === 0) return 100;
  
  const mean = wpmOverTime.reduce((sum, wpm) => sum + wpm, 0) / wpmOverTime.length;
  
  const variance = wpmOverTime.reduce((sum, wpm) => {
    return sum + Math.pow(wpm - mean, 2);
  }, 0) / wpmOverTime.length;
  
  const stdDev = Math.sqrt(variance);
  
  // Coefficient of Variation (CV)
  const cv = (stdDev / mean) * 100;
  
  // Consistency as inverse of CV
  const consistency = Math.max(0, 100 - cv);
  
  return Math.round(consistency * 10) / 10;
};