import { useState, useRef, useLayoutEffect, } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWindowEvent } from "@mantine/hooks";
import { fetchWords } from "../../api/API";
import { WordView } from "../../wordRender/WordView";
import { Button } from "@mantine/core";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { CountdownTimer } from "./Timer";
import { queryClient } from "../../main";
import { ShowResult } from "./ShowResult";
import type { Result } from "../../types";
import { useNavigate } from "react-router-dom";

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

export const Game = () => {
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([""]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [time, setTime] = useState (4);
  const wordsRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const navigate = useNavigate();


  const saveResult = () => {
      setFinished(true);
      
    let currentUser = JSON.parse(localStorage.currentUser);
    
    let count = 0;
    text.forEach((word, index) => {
    if (word === userInput[index]) {
      count++;
    }
  });
    
  let result : Result = {text : text, userInput: userInput, seconds: time, correctWords:count, WPM: count/time/60};

  currentUser.results.push(result)
  currentUser = JSON.stringify(currentUser);
  localStorage.setItem("currentUser", currentUser);
  console.log(JSON.parse(currentUser));

  }

  useWindowEvent("keydown", handler);

  const { data: text = [], isPending } = useQuery({
    queryKey: ["words"],
    queryFn: fetchWords,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
 
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

      startGame();
    
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
    setFinished(false);
  };
  function startGame(): void {
    setHasStarted(true);

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


useLayoutEffect(() => {
  const activeSpan = wordsRefs.current[index];
  if(activeSpan){
    activeSpan.scrollIntoView({behavior: "smooth", block: "center"})
  }
}, [index]);



  return (
    <div className="relative bg-[#3b3b3b] flex justify-between flex-col min-h-screen items-center lg:pl-100 lg:pr-100 md:pl-20 md:pr-20 p-20 sm:pl-10 sm:pr-10 ">
      <div>
      <CountdownTimer
        isRunning={hasStarted}
        onFinish={saveResult}
        time={time}
      />
      <ShowResult
        worda={text}
        typed={userInput}
        seconds={time}
        ifFinished={isFinished}
      />
      </div>
      <button onClick={()=> navigate("/login")}>login</button>
      <div className="relative  overflow-hidden w-4/5 h-[190px]">
      <div className="flex flex-wrap text-gray-500 gap-x-2 absolute  overflow-hidden top-0 left-0 text-[40px] transition-transform ease-out duration-200 ">
        {
           text.map((word, wordIndex) => (
            
          <WordView
            key={wordIndex}
            word={word}
            typed={userInput[wordIndex] ?? ""}
            isActive={index === wordIndex}
            ref ={(el) => {(wordsRefs.current[wordIndex]= el)}}
           

          />
        ))}
      </div>
      </div>
      <div>
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

    </div>

  );
};
