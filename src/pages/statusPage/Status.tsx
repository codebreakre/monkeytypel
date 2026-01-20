import { Attempt } from "./Attempt";
import type { Result } from "../../types";
import { Accordion, Container, Title } from "@mantine/core";
import classes from "./attempt.module.css";
import { StatsGroup } from "./component/stats";
import "@mantine/core/styles.css";
import type { Stats} from "./component/stats";




export const Status = () => {
  const user = JSON.parse(localStorage.currentUser);
  const results: Result[] = user.results;

  const avarageWPM = ():number => {
    let wpm = 0
    results.map((result)=>
      wpm += result.WPM
    )
    wpm = wpm/results.length
    return wpm;
  }

  const overAllCW = () :number => {
    let cw = 0 ;
    results.map((result)=>
      cw += result.correctWords
    )
    return cw;
  }

   const overAllAttempt = ():number => {
    let allAttempt = results.length; ;
    return allAttempt;
  }
  let stats: Stats[] = [
      {
        count: avarageWPM(),
        title: "Avrage WPM",
        detail: "Your avarage WPM since u created the account"
      },
      {
        count: overAllAttempt(),
        title: "Your OverAll Attempts",
        detail: "Your overall attempts since u created the account"
      },
      {
        count: overAllCW(),
        title: "OverAll Correct Words ",
        detail: "All the correct words u wrote since your account has been created"
      }
  ]
    
  return (
    <>
      <div className="w-full h-full bg-[#3b3b3b]">
        <div className="fixed top-0 left-0 w-3/10 h-full ">
          <Container
            size="sm"
            className={`${classes.wrapper} h-full flex flex-col  text-yellow-400`}
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

        <div className="ml-[35%] h-full pt-[25%] pr-[5%]">
            <StatsGroup data={stats}/>
        </div>
      </div>
    </>
  );
};
