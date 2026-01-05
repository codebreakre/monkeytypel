import React from "react";
import { Letter, Space } from "./letters";

type LetterType = "correct" | "false" | "default" | "extra";

type Props = {
  word: string;
  typed: string;
  isActive: boolean;
};

function WordViewBase({ word, typed, isActive }: Props) {
  const letters = word.split("");
  const typedLetters = typed.split("");

  return (
    <span className={isActive ? "" : ""}>
      {letters.map((ch, i) => {
        let type: LetterType = "default";
        if (i < typedLetters.length) {
          type = typedLetters[i] === ch ? "correct" : "false";
        }
        return <Letter key={i} type={type} letter={ch} />;
      })}

      {typedLetters.slice(letters.length).map((ch, i) => (
        <Letter key={`e-${i}`} type="extra" letter={ch} />
      ))}

      <Space />
    </span>
  );
}

// Memo: rerender only if word/typed/isActive changed
export const WordView = React.memo(WordViewBase);
