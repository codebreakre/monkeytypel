import { Letter } from "./Letters/Letter";
// import { ExtraLetter } from "./Letters/ExtraLetter";

import { getLongest, getClassName } from "./utils";

type Props = {
  word: string;
  typed: string;
  isActive: boolean;
};

export function WordView({ word, typed, isActive }: Props) {
  if (!typed && !isActive) {
    return <span className="text-2xl  ">{word}</span>;
  }
  const longest = getLongest(word, typed);
  const wordLength = word.length;
  let wordStyle: string = "";
  if(word.length <= typed.length && isActive) {
   wordStyle = "border-r-2 border-amber-300";
    }
    
    return (
      <span className={`text-2xl ${wordStyle}`}>
        {longest.split("").map((character, characterIndex) => {
            const isCurrent = typed.length === characterIndex;
          if (characterIndex < wordLength) {
            const style = getClassName(
              word[characterIndex],
              typed[characterIndex],
              isCurrent,
              isActive
            );
            return <Letter className={style}>{word[characterIndex]}</Letter>;
          } else {
            const style = getClassName("", typed[characterIndex], false, false);
            return <Letter className={style}>{typed[characterIndex]}</Letter>;
          }
        })}
      </span>
    );  
}
