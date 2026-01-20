import { useState, useRef, useLayoutEffect } from "react";
import { useWindowEvent } from "@mantine/hooks";
import { WordView } from "../../wordRender/WordView";
import { CountdownTimer } from "./Timer";
import { ShowResult } from "./ShowResult";
import type { Result } from "../../types";
import { callWords } from "../../api/hooks/callWords";
import { ignoredKeys } from "./arrayValues";

const timeOptions = [15, 30, 60, 90, 120];
const wordNumberOptions = [10, 25, 50, 100];
const gameOptions = ["time", "words"];

export const Game = () => {
  const [time, setTime] = useState(30);
  const [wordNumber, setWordNumber] = useState(100);
  const [gameOption, setGameOption] = useState("time");
  const { data: text = [], isPending, refetch } = callWords(wordNumber);
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState<string[]>([""]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const wordsRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const saveResult = () => {
    let currentUser = localStorage.currentUser;
    if (!currentUser) {
      setFinished(true);
      return;
    }
    currentUser = JSON.parse(currentUser);
    let correctWord = 0;
    text.forEach((word, index) => {
      if (word === userInput[index]) {
        correctWord++;
      }
    });

    let result: Result = {
      text: text,
      userInput: userInput,
      seconds: time,
      correctWords: correctWord,
      WPM: Math.round((correctWord / time) * 60 * 10) / 10,
    };

    currentUser.results.push(result);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    setFinished(true);
  };

  useWindowEvent("keydown", handler);

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
    setHasStarted(false);
    setFinished(false);
    refetch();
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
    if (activeSpan) {
      activeSpan.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [index]);

  return (
    
      <div className="w-full flex flex-col  justify-between h-full items-center mt-5">
        <div className="h-1/2 flex flex-col justify-between items-center w-full ">
          <div
            className={`mt-10 flex flex-row flex bg-black rounded-lg overflow-hidden items-center transition-[width] ease-in-out duration-300 ${
              gameOption === "time" ? "w-[430px]" : "w-[380px]"
            } `}
          >
            {gameOptions.map((option) => {
              const isActive = option === gameOption;
              return (
                <button
                  key={option}
                  onClick={() => {
                    setGameOption(option);
                    restart();
                  }}
                  disabled={isActive}
                  className={`
                  px-4 py-2 rounded-lg text-sm transition-all  hover:text-white ease-in-out duration-300
                  ${isActive ? "text-yellow-400 " : "text-gray-500 "}
                  disabled:cursor-default
                `}
                >
                  {option}
                </button>
              );
            })}
            <div className="border-l-5 border-white h-5 rounded-2xl"></div>
            {gameOption === "time" ? (
              <div className="shrink-0 overflow-hidden">
                {timeOptions.map((option) => {
                  const isActive = option === time;

                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setTime(option);
                        restart();
                      }}
                      className={`
                  px-4 py-2 rounded-lg text-sm transition-all hover:text-white ease-in-out duration-300
                  ${isActive ? "text-yellow-400 " : "text-gray-500"}
                  disabled:cursor-default
                 
                `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div>
                {wordNumberOptions.map((option) => {
                  const isActive = option === wordNumber;
                  return (
                    <button
                      key={option}
                      onClick={() => {
                        setWordNumber(option);
                        restart();
                      }}
                      className={`
                  px-4 py-2 rounded-lg text-sm transition-all  hover:text-white  ease-in-out duration-300
                  ${isActive ? "text-yellow-400" : "text-gray-500 "}
                  disabled:cursor-default
                `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="relative w-full flex flex-col">
            <div className=" absolute left-0 top-[-50px] ">
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

            <div className="relative  overflow-hidden w-full h-[190px] mt-  ">
              <div className="flex flex-wrap text-gray-500 gap-x-2  overflow-hidden text-[40px] ">
                {text.map((word, wordIndex) => (
                  <WordView
                    key={wordIndex}
                    word={word}
                    typed={userInput[wordIndex] ?? ""}
                    isActive={index === wordIndex}
                    ref={(el) => {
                      wordsRefs.current[wordIndex] = el;
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* footer heseg */}
        
      </div>
  
  );
};
