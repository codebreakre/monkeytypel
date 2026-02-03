import { calculateRaw } from "./resultCalculation/Raw";
import { calculateAccuracy } from "./resultCalculation/Accuracy";
import { calculateConsistency } from "./resultCalculation/Consistency";
import { calculateWPM } from "./resultCalculation/WPM";

type Props = {
  worda: string[];
  typed: string[];
  seconds: number;
};

export function ShowResult({ worda, typed, seconds }: Props) {

    const WPM = calculateWPM(worda, typed, seconds);
    const raw = calculateRaw(worda, seconds);
    const acc = calculateAccuracy(worda, typed);
   return (
    <span className="text-4xl mb-4 text-[#D3DAD9] font-bold">
      <p>Your WPM is {WPM}</p>
      <p>Your raw is {raw}</p>
      <p>Your acc is {acc}%</p>
      <p>seconds {seconds}</p>
    </span>
  );
  
 return null;

}
