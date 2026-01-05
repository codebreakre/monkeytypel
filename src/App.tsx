import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWords } from "./API";
import { Letter, Space } from "./letters";
import { useWindowEvent } from '@mantine/hooks';


// setIndex((prev) => ({
//   ...prev,
//   letter: prev.letter + 1,
// }));

// const data  = ['aa', 'bb', 'cc']
// const userInput = ['aaaaa', 'bbbbb', 'cccccc', 'acdsffkdsfdskfdsfdgfdhjkf']


export const App = () => {
  const [index, setIndex] = useState({ word: 0, letter: 0 });
  const [text, setText] = useState<Word[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["words"],
    queryFn: fetchWords,
  });

  useWindowEvent('keydown', handler);

  function handler(e: KeyboardEvent) {
  
  }

  useEffect(() => {
    if (!isLoading && data) {
      setText(data);
    }
  }, [data, isLoading]);

  

  

  return (
    <div className="flex justify-center items-center min-h-screen pl-10 pr-10 bg-yellow-200">
      <div className="bg-yellow-200">
        {text?.map((word, wi) => (
          <span key={wi}>
            {word.letters.map((item, li) => (
              <Letter
                key={`w${wi}-l${li}`}
                type={item.type}
                letter={item.letter}
              />
            ))}

            {word.extra.map((item, ei) => (
              <Letter
                key={`w${wi}-e${ei}`}
                type={item.type}
                letter={item.letter}
              />
            ))}

            <Space />
          </span>
        ))}
      </div>
    </div>
  );
};
