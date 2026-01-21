type Props = {
  worda: string[];
  typed: string[];
  seconds: number;
  ifFinished: boolean;
};

export function ShowResult({ worda, typed, seconds, ifFinished }: Props) {

    let count = 0;

  worda.forEach((word, index) => {
    if (word === typed[index]) {
      count++;
    }
  });
  
  if (ifFinished) {
   return (
    <span className="text-4xl mb-4 text-[#D3DAD9] font-bold">
      You wrote {count} words in {seconds} seconds
    </span>
  );
  }
 return null;

}
