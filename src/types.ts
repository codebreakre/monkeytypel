export interface User{
    user_id: string;
    joined_date: string;
    nickName: string;
    level: number;
    overallAttempts: number;
    completedAttempts: number;
    typedTime: number;
    averageWPM:number;
    averageRaw: number;
    averageAccuracy: number;
    averageConsistency: number;
}

export interface Result{
    user_id:string
    mode: string;
    wpm: number;
    raw: number;
    acc: number;
    con: number;
    time: number;
    word: number;
}
