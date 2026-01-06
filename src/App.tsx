import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWindowEvent } from "@mantine/hooks";
import { fetchWords } from "./API";
import { WordView } from "./WordView";
import { Button } from "@mantine/core";
import resLogo from "./assets/resLogo.png";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { CountdownTimer } from "./Timer";
import { queryClient } from "./main";
import { ShowResult } from "./showResult";

export const App = () => {
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([""]);
  const [hasStarted, setHasStarted] = useState(false);
  let isFirstInput = true;
  let isFinished = false;
  
  useWindowEvent("keydown", handler);
  const BACKSPACE = "Backspace";
  const SPACE = " ";
  const ignoredKeys = [
    "Shift",
    "Control",
    "Alt",
    "Meta",
    "CapsLock",
    "Enter",
    "Escape",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "ContextMenu",
  ];
  const { data: text = [] } = useQuery({
    queryKey: ["words"],
    queryFn: fetchWords,
  });

  function handler(e: KeyboardEvent) {
    if (e.key === "Tab") {
      e.preventDefault();
      restart();
      return;
    }
    if(isFirstInput){
      setHasStarted(true);
      isFirstInput = false;
    }
    if (ignoredKeys.includes(e.key)) return;
    if (text.length === 0) return;
    if (e.key === BACKSPACE) {
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
    return userInput[index - 1] === text[index - 1];
  }

  const restart = () => {
    setIndex(0);
    setUserInput([""]);
    queryClient.invalidateQueries({
      queryKey: ["words"],
    });
    setHasStarted(false);
    isFirstInput= true;
    isFinished=false;
  };

  return (
    <div className="flex justify-center flex-col min-h-screen items-center lg:pl-150 lg:pr-150 md:pl-20 md:pr-20 p-20 sm:pl-10 sm:pr-10">
      <CountdownTimer isRunning={hasStarted} onFinish={()=> {isFinished = true}} />
      <ShowResult worda={text} typed={userInput} seconds={60} isFinished={isFinished}/>
      <div className="flex flex-wrap">
        {text.map((word, wordIndex) => (
          <WordView
            key={wordIndex}
            word={word}
            typed={userInput[wordIndex] ?? ""}
          />
        ))}
      </div>
      <Button
        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
        onClick={restart}
      >
        <ArrowPathIcon className="w-6 h-6 text-gray-700" />
      </Button>
    </div>
  );
};
