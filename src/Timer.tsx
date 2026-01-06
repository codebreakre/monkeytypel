import { useEffect, useState } from "react";

type Props = {
  isRunning: boolean;
  onFinish: () => void;
};

export function CountdownTimer({ isRunning, onFinish }: Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  // reset when stopped
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(30);
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

   if (!isRunning || timeLeft === 0) return null;

  return <div className="text-4xl mb-4 text-[#D3DAD9] font-bold">{timeLeft}</div>;
}
