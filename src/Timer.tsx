import { useEffect, useState } from "react";

type Props = {
  isRunning: boolean;
  onFinish: () => void;
};

export function CountdownTimer({ isRunning, onFinish }: Props) {
  const [timeLeft, setTimeLeft] = useState(5);

  // reset when stopped
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(5);
    }
  }, [isRunning]);

  // run timer
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

  // notify parent
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      onFinish();
    }
  }, [timeLeft, isRunning, onFinish]);

  if (!isRunning) return null;

  return <div>{timeLeft}</div>;
}
