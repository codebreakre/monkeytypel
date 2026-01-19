import { useState, useRef, useLayoutEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWindowEvent } from "@mantine/hooks";
import { WordView } from "../../wordRender/WordView";
import { CountdownTimer } from "./Timer";
import { queryClient } from "../../main";
import { ShowResult } from "./ShowResult";
import type { Result } from "../../types";
import { useNavigate } from "react-router-dom";
import StatPicture from "../../assets/stats.png";
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
  const navigate = useNavigate();
  let userName = "";
  const user = localStorage.currentUser;
  const isLoggedIn = Boolean(user);
  if (user) {
    userName = JSON.parse(user).nickName;
  }
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
    <div className="bg-[#3b3b3b] flex flex-col h-screen w-screen justify-between items-center  lg:pl-100 lg:pr-100 md:pl-20 md:pr-20 p-20 sm:pl-10 sm:pr-10 ">
      {/* /* header heseg  */}
      <header className="w-4/5">
        <div className="flex flex-row justify-between w-full ">
          {isLoggedIn && (
            <button
              className="w-6 h-6 mr-2 flex flex-row gap-2"
              onClick={() => navigate("/status")}
            >
              <p>status</p>
              <img src={StatPicture} alt="status" />
            </button>
          )}

          <button
            className="mr-2 flex flex-row gap-2 "
            onClick={() => navigate("/login")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <p>{userName}</p>
          </button>
        </div>
      </header>

      {/* /* count heseg */}

      {/* text heseg */}
      <div className="w-4/5 flex flex-col  justify-between h-full items-center mt-5">
        <div className="h-1/2 flex flex-col justify-between items-center w-full ">
          <div className={`mt-10 flex flex-row flex bg-black rounded-lg items-center transition-all ease-in-out duration-300 ${
                gameOption === "time" ? "w-[410px]" : "w-[360px]"
              } `}>
            {gameOptions.map((option) => {
              const isActive = option === gameOption;
              return (
                <button
                  key={option}
                  onClick={() => {setGameOption(option);
             

                  }}
                  disabled={isActive}
                  className={`
                  px-4 py-2 rounded-lg text-sm transition-all  hover:text-white ease-in-out duration-300
                  ${
                    isActive
                      ? "text-yellow-400 "
                      : "text-gray-500 "
                  }
                  disabled:cursor-default
                `}
                >{option}</button>
              );
            })}
            <p className="text-white text-2xl">I</p>
            {gameOption === 'time' ? 
              <div>
                {
                  timeOptions.map((option)=>{
                    const isActive = option === time;
                    
                    return(
                      <button
                      key={option}
                      onClick={()=> setTime(option)}
                      className={`
                  px-4 py-2 rounded-lg text-sm transition-all hover:text-white ease-in-out duration-300
                  ${
                    isActive
                      ? "text-yellow-400 "
                      : "text-gray-500"
                  }
                  disabled:cursor-default
                 
                `}
                      
                      >
                        {option}
                      </button>
                    )
                  })
                } 
              </div> :
              <div >
                  {
                  wordNumberOptions.map((option)=>{
                    const isActive = option === wordNumber;
                    return(
                      <button
                      key={option}
                      onClick={()=> setWordNumber(option)}
                      className={`
                  px-4 py-2 rounded-lg text-sm transition-all  hover:text-white  ease-in-out duration-300
                  ${
                    isActive
                      ? "text-yellow-400"
                      : "text-gray-500 "
                  }
                  disabled:cursor-default
                `}
                      
                      >
                        {option}
                      </button>
                    )
                  })
                } 
              </div>
            }
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
        <div className="w-4/5 flex justify-center">
          <footer className="flex flex-row w-34 justify-between items-center ">
            <p className="bg-gray-500 w-10 h-5 rounded-sm text-center text-sm text-[#3b3b3b]">
              TAB
            </p>
            <p className="text-gray-500">- restart test</p>
          </footer>
        </div>
      </div>
    </div>
  );
};
