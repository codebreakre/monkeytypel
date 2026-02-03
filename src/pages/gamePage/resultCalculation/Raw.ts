export  const calculateRaw = (typed: string[], timeInSeconds: number): number => {
    let letterCount = 0;
    typed.forEach((word) => {
        letterCount += word.length;
    });
    letterCount += (typed.length - 1); 
    const wordsWritten = letterCount /5 ;
    const raw = (wordsWritten / timeInSeconds) * 60;
    return Math.round(raw * 10) / 10;

}