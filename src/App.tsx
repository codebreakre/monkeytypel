import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWindowEvent } from "@mantine/hooks";
import { fetchWords } from "./API";
import { WordView } from "./WordView";
import { Button } from "@mantine/core";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { CountdownTimer } from "./Timer";
import { queryClient } from "./main";
import { ShowResult } from "./ShowResult";

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

export const App = () => {
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([""]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setFinished] = useState(false);

  useWindowEvent("keydown", handler);

  const { data: text = [], isPending } = useQuery({
    queryKey: ["words"],
    queryFn: fetchWords,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  let isFirstInput = true;
  const BACKSPACE = "Backspace";
  const SPACE = " ";

  function handler(event: KeyboardEvent) {
    if (isPending) {
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      restart();
      return;
    }
    if (isFinished) return;
    if (text.length === 0) return;

    if (isFirstInput) {
      startGame();
    }
    if (ignoredKeys.includes(event.key)) return;
    if (event.key === BACKSPACE) {
      handleBackSpace();
    } else if (event.key === SPACE) {
      handleSpace();
    } else {
      setUserInput((prev) => {
        const newInput = [...prev];
        newInput[index] = newInput[index] + event.key;
        return newInput;
      });
    }
    console.log(userInput);
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
    isFirstInput = true;
    setFinished(false);
  };
  function startGame(): void {
    setHasStarted(true);
    isFirstInput = false;
  }

  function handleSpace(): void {
    if (userInput[index].length === 0) return;
    const newIndex = index + 1;
    setIndex(index + 1);
    setUserInput((prev) => {
      const newInput = [...prev];
      newInput[newIndex] = "";
      return newInput;
    });
  }

  function handleBackSpace(): void {
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
  }

  return (
    <div className="bg-[#3b3b3b] flex justify-center flex-col min-h-screen items-center lg:pl-100 lg:pr-100 md:pl-20 md:pr-20 p-20 sm:pl-10 sm:pr-10">
      <CountdownTimer
        isRunning={hasStarted}
        onFinish={() => {
          setFinished(true);
        }}
      />
      <ShowResult
        worda={text}
        typed={userInput}
        seconds={30}
        ifFinished={isFinished}
      />
      <div className="flex flex-wrap text-gray-500 gap-x-2">
        { 
           text.map((word, wordIndex) => (
            
          <WordView
            key={wordIndex}
            word={word}
            typed={userInput[wordIndex] ?? ""}
            isAcitve  ={wordIndex === index}
          />
        ))}
      </div>
      <Button
        className="p-2 rounded-full bg-[#3b3b3b] mt-8 flex"
        onClick={restart}
      >
        <ArrowPathIcon className="w-6 h-6 text-[#e03131] hover:text-amber-50 transition-colors duration-200 ease-in-out" />
      </Button>
      <footer className="flex flex-row w-34 justify-between items-center ">
        <p className="bg-gray-500 w-10 h-5 rounded-sm text-center text-sm text-[#3b3b3b]">
          {" "}
          TAB{" "}
        </p>
        <p className="text-gray-500">- restart test</p>
      </footer>

    </div>
  );
};
