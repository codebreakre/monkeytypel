import { useEffect, useState } from "react";

type Props = {
  isRunning: boolean;
  onFinish: () => void;
  time: number;
};

export function CountdownTimer({ isRunning, onFinish, time }: Props) {
  const [timeLeft, setTimeLeft] = useState(time);


  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(time);
    }
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      onFinish();

    }
  }, [timeLeft, isRunning]);

   if (!isRunning || timeLeft === 0) return null;

  return <div>{timeLeft}</div>;
}
