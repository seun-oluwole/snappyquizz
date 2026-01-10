import { useQuizzContext } from "../context/quizz-context";

interface Props {
  currentIndex: number
}

export default function QuizzHead({ currentIndex }: Props) {
  const { quizzData } = useQuizzContext();
  const currentQuestion: number = currentIndex + 1;
  const totalQuestions: number = quizzData?.length;

  return (
    <div className="flex justify-between items-center text-white font-semibold h-16 p-3 bg-violet-500 rounded-2xl outline-2 outline-offset-2 ouline-violet-100">
      <div>
     {`Question ${currentQuestion}/${totalQuestions}`}
      </div>
      <div>
        00:00
      </div>
    </div>
  )
}