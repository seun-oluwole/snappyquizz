import { useQuizzContext } from "../context/quizz-context";
import LoadingSvg from "./loading-svg";
import QuestionCount from "./question-count";
import { SelectCategory, SelectDifficulty, SelectType } from "./selectors";

export default function Preference() {
  const { setSteps, setCategory, setDifficulty, setQuizzType, loadingQuizz, initQuizzData } = useQuizzContext();

  function handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value, name } = e.target;

    if (name === "category") {
      setCategory(value);
    } else if (name === "difficulty") {
      setDifficulty(value);
    } else if (name === "type") {
      setQuizzType(value);
    }
  }

  function handleNextStep() {
   initQuizzData()
   .then(() => {setSteps((prev: number): number => prev + 1)})
   .catch((error) => {alert(error.message)})
  }

  return (
    <div className="flex flex-col align-center gap-7 w-full max-w-md p-3">
      <QuestionCount />
      <SelectCategory handleSelect={handleSelect} />
      <SelectDifficulty handleSelect={handleSelect} />
      <SelectType handleSelect={handleSelect} />

      <button onClick={handleNextStep} className="flex flex-col items-center justify-center w-full h-15 grow-0 text-white text-lg font-semibold bg-amber-500 hover:bg-amber-500/90 rounded-3xl">
        {loadingQuizz ? <LoadingSvg width="35" height="35" /> : "Start quizz⚡️"}
      </button>
    </div>
  );
}
