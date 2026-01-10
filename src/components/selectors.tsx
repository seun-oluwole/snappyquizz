import { useQuizzContext } from "../context/quizz-context";
import { quizzCategories } from "../utils/quizz-categories";

interface Props {
  handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectCategory({ handleSelect }: Props) {
  const { category } = useQuizzContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="quizzCategory" className="text-white font-semibold">
        Select Category:
      </label>
      <select value={category} name="category" id="quizzCategory" onChange={handleSelect} className="text-white font-semibold bg-violet-500 p-3 h-15 rounded-2xl outline outline-violet-100 focus:outline-2 foucs:outline-offset-2  cursor-pointer">
        {quizzCategories.map((category, index) => (
          <option key={index} value={category.id}>{category.name}</option>
        ))}
      </select>
    </div>
  );
}

export function SelectDifficulty({ handleSelect }: Props) {
  const { difficulty } = useQuizzContext();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="quizzDifficulty" className="text-white font-semibold">Select Difficulty:</label>
      <select value={difficulty} name="difficulty" id="quizzDifficulty" onChange={handleSelect} className="text-white font-semibold bg-violet-500 p-3 h-15 rounded-2xl outline outline-violet-100 focus:outline-2 foucs:outline-offset-2  cursor-pointer">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="difficult">Hard</option>
      </select>
    </div>
  );
}

export function SelectType({ handleSelect }: Props) {
  const { quizzType } = useQuizzContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="quizzDifficulty" className="text-white font-semibold">Select Type:</label>
      <select value={quizzType} name="type" id="quizzDifficulty" onChange={handleSelect} className="text-white font-semibold bg-violet-500 p-3 h-15 rounded-2xl outline outline-violet-100 focus:outline-2 foucs:outline-offset-2  cursor-pointer">
        <option value="boolean">True/False</option>
        <option value="multiple">Multiple Choice</option>
      </select>
    </div>
  )
}
