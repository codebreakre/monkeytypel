type Props = {
  worda: string[];
  typed: string[];
  seconds: number;
  isFinished: boolean;
};

export function ShowResult({ worda, typed, seconds, isFinished }: Props) {
  let count = 0;

  worda.forEach((word, index) => {
    if (word === typed[index]) {
      count++;
    }
  });

  if (isFinished) {
   return (
    <span>
      You wrote {count} words in {seconds} seconds
    </span>
  );
  }
 return null;

}
