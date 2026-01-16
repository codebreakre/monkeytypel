export interface User{
    nickName: string;
    averageWPM: number;
    results: Result[]
}

export interface Result{
    text: string[],
    userInput: string[],
    seconds: number,
    correctWords: number,
    WPM: number
}
