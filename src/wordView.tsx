import React from "react";
import { Letter } from "./Letters/Letter";
// import { ExtraLetter } from "./Letters/ExtraLetter";

import { getLongest, getClassName } from './utils';

type Props = {
  word: string;
  typed: string;
  isAcitve: boolean
};

export function WordView({ word, typed, isAcitve }: Props) {
  if (!typed) {
    return (
      <span className='text-2xl mr-5'>
        {word}
      </span>
    )
  }

  const longest = getLongest(word, typed);
  let typedLength : number = 0;
  if(isAcitve) {
      typedLength = typed.length;
  }
  if(!isAcitve) {
  return (
    <span className="mr-5">
      {
        longest.split('').map((character, characterIndex) => {
          const className = getClassName(word[characterIndex], typed[characterIndex]);
          return (
            <Letter key={characterIndex} className={className}>
              {character}
            </Letter>
          )
        })
      }
    </span>
  )
}
  if(isAcitve){
    return (
      <>
      <span className="border-r-2 border-l-amber-200">
        {
        typed.split('').map((character, characterIndex) => {
          const className = getClassName(word[characterIndex], typed[characterIndex]);
          return (
            <Letter key={characterIndex} className={className}>
              {character}
            </Letter>
          )
        })
      }
      </span>
      <span>
        {
        word.slice(typedLength).split('').map((character, characterIndex) => {
          console.log(typedLength)
          const className = getClassName(word[characterIndex], typed[characterIndex]);
          return (
            <Letter key={characterIndex} className={className}>
              {character}
            </Letter>
          )
        })
      }
      </span>
      </>
    )
  }
}
