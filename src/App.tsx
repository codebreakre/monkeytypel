import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWindowEvent } from "@mantine/hooks";
import { fetchWords } from "./API";
import { WordView } from "./wordView";

export const App = () => {
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([""]);

  const { data } = useQuery({
    queryKey: ["words"],
    queryFn: fetchWords,
  });

  const text = data ?? [];

  function handler(e: KeyboardEvent) {
    const BACKSPACE = "Backspace";
    const SPACE = " ";
    if (text.length === 0) return;
    if (e.key === BACKSPACE) {
      if (index === 0) return;
      if (userInput[index].length === 0) {
        if (!checkPrevWord()) {
          setIndex(index - 1);
          return;
        }
        return;
      }
      if (userInput[index].length > 0) {
        setUserInput((prev) => {
          const newInput = [...prev];
          newInput[index] = newInput[index].slice(0, -1);
          return newInput;
        });
      }
    } else if (e.key === SPACE) {
      if (userInput[index].length === 0) return;
      const newIndex = index + 1;
      setIndex(index + 1);
      setUserInput((prev) => {
        const newInput = [...prev];
        newInput[newIndex] = "";
        return newInput;
      });
    } else {
      setUserInput((prev) => {
        const newInput = [...prev];
        newInput[index] = newInput[index] + e.key;
        return newInput;
      });
    }
  }

  function checkPrevWord(): boolean {
    if (userInput[index - 1] === text[index - 1]) {
      return true;
    } else {
      return false;
    }
  }

  useWindowEvent("keydown", handler);

  return (
    <div className="p-6">
      {text.map((word, wi) => (
        <WordView
          key={wi}
          word={word}
          typed={userInput[wi] ?? ""}
          isActive={wi === index}
        />
      ))}
    </div>
  );
};
