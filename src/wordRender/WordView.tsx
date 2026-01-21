import { forwardRef } from "react";
import type {Ref} from "react";


import { getLongest, getClassName } from "./utils";

type Props = {
  word: string;
  typed: string;
  isActive: boolean;
};

export const WordView = forwardRef<HTMLSpanElement, Props>(({ word, typed, isActive }, ref :Ref<HTMLSpanElement>) => {
  if (!typed && !isActive) {
    return <span ref={ref} className="  ">{word}</span>;
  }
  const longest = getLongest(word, typed);
  const wordLength = word.length;

    
    return (
      <span ref={ref} >
        {longest.split("").map((_, characterIndex) => {
          if (characterIndex < wordLength) {
            const style = getClassName(
              word[characterIndex],
              typed[characterIndex],
            );
            return <span className={style}>{word[characterIndex]}</span>;
          } else {
            const style = getClassName("", typed[characterIndex]);
            return <span className={style}>{typed[characterIndex]}</span>;
          }
        })}
      </span>
    );  
}
)
