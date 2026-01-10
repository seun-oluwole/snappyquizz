import { useState } from "react";
import { useQuizzContext } from "../context/quizz-context";

export default function QuestionCount() {
  const [activeButton, setActiveButton] = useState<unknown>(1);
  const { setQuestionCount } = useQuizzContext();

  const buttons: { id: number; count: number }[] = [
    { id: 1, count: 10 },
    { id: 2, count: 20 },
    { id: 3, count: 30 },
    { id: 4, count: 40 },
  ];

  function handleClick(id: number, questionCount: number) {
    setActiveButton(id);
    setQuestionCount(questionCount);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-white font-semibold">How many questions do you want?</div>
      <div className="flex justify-between">
        {buttons.map((button) => (
          <button
            key={button.id}
            onClick={() => handleClick(button.id, button.count)}
            className={`text-white font-semibold bg-violet-500 hover:bg-violet-500/90 py-3 px-6 rounded-2xl outline outline-violet-100 ${
              button.id === activeButton ? "outline-2 outline-offset-2" : ""
            } cursor-pointer`}
          >
            {button.count}
          </button>
        ))}
      </div>
    </div>
  );
}
