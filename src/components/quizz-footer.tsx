import { useEffect, useRef, useState } from "react";
import { useQuizzContext } from "../context/quizz-context";
import { HiRefresh } from "react-icons/hi";
import { useModalContext } from "../context/modal-context";

interface Props {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuizzFooter({ currentIndex, setCurrentIndex }: Props) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const trueBtnRef = useRef<HTMLButtonElement | null>(null);
  const falseBtnRef = useRef<HTMLButtonElement | null>(null);
  const { setRestartGameModal } = useModalContext();
  const { quizzData, totalCorrectAnswers, setTotalCorrectAnswers, setSteps, addPointsEarned, playAgain } = useQuizzContext();

  const currentQuestionNumber: number = currentIndex + 1;
  const totalQuestions: number = quizzData.length;

  useEffect(() => {
    const savedCurrentIndex: string | null = localStorage.getItem("currentIndex");
    if (savedCurrentIndex) {
      setCurrentIndex(parseInt(savedCurrentIndex, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentIndex", JSON.stringify(currentIndex));
  }, [currentIndex]);


  function handleNavigate() {
    // Checks and navigates to next question or result page if last question.
    if (currentQuestionNumber < totalQuestions) {
      setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1)); // navigates to next index and prevents loop back.
    } 

    if (currentQuestionNumber === totalQuestions) {
      setSteps((prev: number) => prev + 1)
    }
  }

  function validateAnswer(userAnswer: string) {
    const currentQuestion = quizzData[currentIndex];
    const correctAnswer = currentQuestion?.correct_answer;
 
    if (userAnswer === "True" && correctAnswer === "True") {
      trueBtnRef?.current?.classList.add("correct");
      setTotalCorrectAnswers((prev) => prev + 1);
      addPointsEarned(15);
      setIsDisabled(true); // Disables button on first click to prevent reocurring clicks.
      setTimeout(() => {
        trueBtnRef?.current?.classList.remove("correct");
        setIsDisabled(false);
        handleNavigate();
      }, 1500);

    } else if (userAnswer === "False" && correctAnswer === "False") {
      falseBtnRef?.current?.classList.add("correct");
      setTotalCorrectAnswers((prev) => prev + 1);
      addPointsEarned(15);
      setIsDisabled(true);
      setTimeout(() => {
        falseBtnRef?.current?.classList.remove("correct");
        setIsDisabled(false);
        handleNavigate();
      }, 1500);

    } else if (userAnswer === "True" && correctAnswer === "False") {
      trueBtnRef?.current?.classList.add("wrong");
      falseBtnRef?.current?.classList.add("correct");
      setIsDisabled(true);
      setTimeout(() => {
        trueBtnRef?.current?.classList.remove("wrong");
        falseBtnRef?.current?.classList.remove("correct");
        setIsDisabled(false);
        handleNavigate();
      }, 1500);

    } else if (userAnswer === "False" && correctAnswer === "True") {
      falseBtnRef?.current?.classList.add("wrong");
      trueBtnRef?.current?.classList.add("correct");
      setIsDisabled(true);
      setTimeout(() => {
        falseBtnRef?.current?.classList.remove("wrong");
        trueBtnRef?.current?.classList.remove("correct");
        setIsDisabled(false);
        handleNavigate();
      }, 1500);
    } 
  }
  
  return (
    <div className="flex mt-5 justify-around rounded-2xl">
      <button
        ref={trueBtnRef}
        className="h-15 w-25 text-white text-lg font-semibold bg-amber-500 hover:bg-amber-500/90 rounded-2xl border-2"
        onClick={() => validateAnswer("True")}
        disabled={isDisabled}
      >
        True
      </button>
      <button
        className="h-15 px-3 text-white text-lg font-semibold bg-amber-500 hover:bg-amber-500/90 rounded-2xl border-2"
        onClick={() => setRestartGameModal(true)}
      >
       <HiRefresh className="h-10 w-10"/>
      </button>
      
      <button
        ref={falseBtnRef}
        className="h-15 w-25 text-white text-lg font-semibold bg-amber-500 hover:bg-amber-500/90 rounded-2xl border-2"
        onClick={() => validateAnswer("False")}
        disabled={isDisabled}
      >
        False
      </button>
    </div>
  );
}
