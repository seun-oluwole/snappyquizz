import { useEffect } from "react";
import { useQuizzContext } from "../context/quizz-context";
import ViewContainer from "./view-container";
import { HiRefresh } from "react-icons/hi";

export default function QuizzResult() {
  const { quizzData, totalCorrectAnswers, pointsEarned, playAgain, addTotalPoints, totalPoints, gameEnded, setGameEnded } = useQuizzContext();
  const totalQuestions: number = quizzData?.length;

  useEffect(() => {
    if (pointsEarned > 0 && !gameEnded) {
      addTotalPoints();
      setGameEnded(true);
    }
  } , [])

  return (
    <ViewContainer>
      <div className="flex flex-col gap-5 p-4 w-full max-w-md relative">
        <div className="flex flex-col justify-center mt-5 items-center">
          <div className="text-white text-3xl font-funnel font-semibold">Congratulations</div>
          <span className="text-[5rem]">🎊</span>
        </div>
        <div className="flex flex-col gap-6 text-white font-funnel font-semibold p-4 bg-violet-500 rounded-2xl outline-3 outline-dashed outline-offset-2 outline-violet-100">
          <div className="flex flex-col items-center">
            <h2 className="text-xl">Your Score</h2>
            <div className="text-lg">{`${totalCorrectAnswers}/${totalQuestions}`}</div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl">Points Earned</h2>
            <div className="flex gap-1 text-lg">
              <span>💎</span>
              <span>{ pointsEarned }</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-xl">Total Points</h2>
            <div className="flex gap-1 text-lg">
              <span>💎</span>
              <span>{ totalPoints }</span>
            </div>
          </div>
          <button className="bg-amber-500 h-13 rounded-3xl flex items-center justify-center gap-1 text-lg font-medium" onClick={playAgain}>Play again <HiRefresh /></button>
        </div>
      </div>
    </ViewContainer>
  );
}
