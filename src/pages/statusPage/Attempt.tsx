import { Accordion, Container, Title } from "@mantine/core";
import classes from "./attempt.module.css";
import { WordView } from "../../wordRender/WordView";

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
    <Accordion.Item className={classes.item} value={`result ${index}`} style={{ backgroundColor: "gray" }}>
      <Accordion.Control className="flex flex-row w-full ">
        <div className="w-full flex flex-row justify-between items-center">
            <section>{wpm}</section>
        </div>
      </Accordion.Control>
      <Accordion.Panel>
        <div className="flex flex-col">
            <div className="flex flex-row justify-between w-full">
                <p>{correctWords}</p>
                <p>{seconds}</p>
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
    </div>
  );
};
