import { useQuizzContext } from "../context/quizz-context";
import decodeHtmlEntities from "../utils/utils";

interface Props {
  currentIndex: number;
}


export default function QuizzContent({ currentIndex }: Props) {
  const { quizzData } = useQuizzContext();
    
  return (
    <div className="flex flex-col align-center text-center justify-center p-5 outline-3 outline-dashed outline-offset-2 outline-violet-100 h-[250px] rounded-2xl bg-violet-500">
      <p className="text-white text-2xl font-funnel font-semibold">{quizzData.length > 0 ? (decodeHtmlEntities(quizzData[currentIndex]?.question)) : "No Quizz Available."}</p>
    </div>
  )
}