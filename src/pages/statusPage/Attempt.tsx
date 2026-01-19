import { Accordion } from "@mantine/core";
import classes from "./attempt.module.css";
import { WordView } from "../../wordRender/WordView";
import { Badge } from '@mantine/core';



type Props = {
  text: string[];
  userInput: string[];
  wpm: number;
  seconds: number;
  correctWords: number;
  index: number;
};

export const Attempt = ({
  text,
  userInput,
  wpm,
  seconds,
  correctWords,
  index,
}: Props) => {
  return (
    <div className="">
    <Accordion.Item className={classes.item} value={`result ${index}`} style={{ backgroundColor: "#3b3b3b" }}>
      <Accordion.Control className="flex flex-row w-full  ">
        <div className="w-full flex flex-row justify-between items-center">
          {wpm < 30 ? 
          <Badge color="yellow">Not Bad</Badge> :
          <Badge color="green">Excelent</Badge>
          }
            <section className="text-yellow-400 font-bold mr-5">{wpm}%</section>
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between w-full font-bold pb-3 pt-3">
                <p >Correct Words: {correctWords}</p>
                <p >The seconds: {seconds}</p>
            </div>
            <div className="flex flex-row flex-wrap gap-1 text-gray-500">
          {text.map((word, index) => {
            return (
              <WordView
                word={word}
                typed={userInput[index] ?? ""}
                isActive={false}
              />
            );
          })}
        </div>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
    <div className="border-b-1 border-amber-100 mb-3"></div>
    </div>
  );
};
