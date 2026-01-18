import { Attempt } from "./Attempt";
import type { Result } from "../../types";
import { Accordion, Container, Title } from "@mantine/core";
import classes from "./attempt.module.css";
import { StatsGroup } from "./component/stats";
import "@mantine/core/styles.css";




export const Status = () => {
  const user = JSON.parse(localStorage.currentUser);
  const results: Result[] = user.results;
  return (
    <>
      <div className="w-screen h-screen bg-[#3b3b3b]">
        <div className="fixed top-0 left-0 w-3/10 h-full ">
          <Container
            size="sm"
            className={`${classes.wrapper} h-full flex flex-col`}
          >
            <Title ta="center" className={classes.title} style={{ marginBottom: 50 }}>
              Recent Attempts
            </Title>

            <div className=" overflow-auto no-scrollbar ">
              <Accordion variant="separated">
                {results.map((result, index) => {
                  return (
                    <Attempt
                      text={result.text}
                      userInput={result.userInput}
                      wpm={result.WPM}
                      correctWords={result.correctWords}
                      seconds={result.seconds}
                      index={index}
                    />
                  );
                })}
              </Accordion>
            </div>
          </Container>
        </div>

        <div className="ml-[35%] h-full pt-[15%] pr-[5%]">
            <StatsGroup/>
        </div>
      </div>
    </>
  );
};
