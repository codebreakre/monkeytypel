
interface WordCounterProps {
    userInput: string[]
    wordReach: number;
    onFinish: () => void
    hasStarted: boolean
}


export const WordCounter = ({userInput , wordReach, onFinish, hasStarted } : WordCounterProps) => {
    if(userInput.length > wordReach) {
        onFinish();
    }
    return (
        <div className={`${hasStarted ? "" : "hidden"}`}>
          {userInput.length}/{wordReach}
        </div>      
    );
}