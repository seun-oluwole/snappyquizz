import { useEffect } from "react";
import { useQuizzContext } from "../context/quizz-context";

export default function Timer() {
  const { secondsElapsed, setSecondsElapsed } = useQuizzContext();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsElapsed((prev: number) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes: number = Math.floor(secondsElapsed / 60);
  let seconds: number = secondsElapsed % 60;

  return <div>{seconds < 10 ? `${minutes}:0${seconds}` : `${minutes}:${seconds}`}</div>;
}
