import { useState } from "react";
import QuizzContent from "./quizz-content";
import QuizzFooter from "./quizz-footer";
import QuizzHead from "./quizz-head";
import PlayerDetails from "./player-details";

export default function QuizzInterface() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  return (
    <div className="flex flex-col p-4 gap-4 align-center justify-center w-full max-w-md">
      <PlayerDetails />
      <QuizzHead currentIndex={currentIndex}/>
      <QuizzContent currentIndex={currentIndex}/>
      <QuizzFooter currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
    </div>
  );
}
