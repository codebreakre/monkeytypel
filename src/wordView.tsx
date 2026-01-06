import React from "react";
import { Letter } from "./Letters/Letter";
import { ExtraLetter } from "./Letters/ExtraLetter";

type Props = {
  word: string;
  typed: string;
};

function WordViewBase({ word, typed }: Props) {
  const letters = word.split("");
  const typedLetters = typed.split("");

  return (
    <span className="mr-5">
      {letters.map((ch, i) => {
        let type: string = "gray";
        if (i < typedLetters.length) {
          type = typedLetters[i] === ch ? "white" : "#e03131";
        }
        return (
          <Letter key={i} color={type}>
            {ch}
          </Letter>
        );
      })}

      {typedLetters.slice(letters.length).map((ch, i) => {
        return <ExtraLetter key={`e-${i}`}>{ch}</ExtraLetter>;
      })}
    </span>
  );
}
export const WordView = React.memo(WordViewBase);
