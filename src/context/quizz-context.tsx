import type { QuizzContextType, QuizzData } from "../utils/types";
import { createContext, useContext, useEffect, useState } from "react";

const QuizzContext = createContext<QuizzContextType | undefined>(undefined);

export default function QuizzContextProvider({ children }: React.PropsWithChildren) {
  const [steps, setSteps] = useState<number>(1);
  const [playerName, setPlayerName] = useState<string>("");
  const [playerGender, setPlayerGender] = useState<string>("");
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [pointsEarned, setPointsEarned] = useState<number>(0);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState<number>(0);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("9");
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [quizzType, setQuizzType] = useState<string>("boolean");
  const [quizzData, setQuizzData] = useState<QuizzData[]>([]);
  const [loadingQuizz, setLoadingQuizz] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<unknown>(undefined);

  const BASE_URL = "https://opentdb.com";

  useEffect(() => {
    const currentStep: string | null = localStorage.getItem("steps");
    const gameEnded: string | null = localStorage.getItem("gameEnded");
    const savedPoints: string | null = localStorage.getItem("totalPoints");
    const savedQuizzData: string | null = localStorage.getItem("quizzData");
    const savedPointsEarned: string | null = localStorage.getItem("pointsEarned");
    const savedCorrectAnswers: string | null = localStorage.getItem("correctAnswers");
    const savedPlayerName: string | null = localStorage.getItem("playerName");
    const savedPlayerGender: string | null = localStorage.getItem("playerGender");
    const savedSecondsElapsed: string | null = localStorage.getItem("secondsElapsed");

    if (currentStep) {
      setSteps(parseInt(currentStep, 10));
    }

    if (savedPoints) {
      setTotalPoints(parseInt(savedPoints, 10));
    }

    if (savedQuizzData) {
      setQuizzData(JSON.parse(savedQuizzData));
    }

    if (savedPointsEarned) {
      setPointsEarned(parseInt(savedPointsEarned, 10));
    }

    if (savedCorrectAnswers) {
      setTotalCorrectAnswers(parseInt(savedCorrectAnswers, 10))
    }

    if (gameEnded) {
      setGameEnded(JSON.parse(gameEnded));
    }

    if (savedPlayerName) {
      setPlayerName(savedPlayerName);
    }

    if (savedPlayerGender) {
      setPlayerGender(JSON.parse(savedPlayerGender));
    }

    if (savedSecondsElapsed) {
      setSecondsElapsed(parseInt(savedSecondsElapsed, 10));
    }
  } , [])

  useEffect(() => {
    localStorage.setItem("steps", JSON.stringify(steps));
    localStorage.setItem("totalPoints", JSON.stringify(totalPoints));
    localStorage.setItem("pointsEarned", JSON.stringify(pointsEarned));
    localStorage.setItem("correctAnswers", JSON.stringify(totalCorrectAnswers));
    localStorage.setItem("gameEnded", JSON.stringify(gameEnded));
    localStorage.setItem("playerGender", JSON.stringify(playerGender));
  }, [steps, totalPoints, pointsEarned, totalCorrectAnswers, gameEnded, playerGender]);

  useEffect(() => {
    localStorage.setItem("secondsElapsed", JSON.stringify(secondsElapsed));
  }, [secondsElapsed]);

  function addPointsEarned(points: number) {
    setPointsEarned((prev: number) => prev + points);
  }

  function addTotalPoints() {
    setTotalPoints((prev: number) => prev + pointsEarned)
  }

  async function generateToken() {
    try {
      setLoadingQuizz(true);
      const response = await fetch(`${BASE_URL}/api_token.php?command=request`);
      if (!response.ok) throw new Error("Failed to fetch token");
      const data = await response.json();
      return data.token;
    } catch (err) {
      if (err) return;
    } finally {
      setLoadingQuizz(false);
    }
  }

  async function fetchQuizz(token: string) {
    setLoadingQuizz(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api.php?amount=${questionCount}&category=${category}&difficulty=${difficulty}&type=${quizzType}&token=${token}`
      );

      if (!response.ok) return;

      const quizzResult = await response.json();

      if (quizzResult?.response_code === 0) {
        setQuizzData(quizzResult.results); // Sets quizz data to state...
        localStorage.setItem("quizzData", JSON.stringify(quizzResult?.results)); // Sets quizz data to localStorage...

      } else if (quizzResult?.response_code === 3) {
        await generateToken();

      } else if (quizzResult?.response_code === 4) {
        const resetResponse = await fetch(`${BASE_URL}/api_token.php?command=reset&token=${token}`);
       
        if (!resetResponse.ok) {
          throw new Error("Failed to reset token");
        }
      }
    } catch (error: unknown) {
      setFetchError(error);
    } finally {
      setLoadingQuizz(false);
    }
  }

  const initQuizzData: () => Promise<void> = async () => {
      const token: string = await generateToken();
      if (token) {
        await fetchQuizz(token);
      }
    };

  function playAgain() {
    setSteps(1);
    setQuizzData([]);
    setPointsEarned(0);
    setQuestionCount(10);
    setCategory("9");
    setDifficulty("easy");
    setQuizzType("boolean");
    setTotalCorrectAnswers(0);
    setGameEnded(false);
    localStorage.removeItem("currentIndex");
    localStorage.removeItem("quizzData");
    localStorage.removeItem("gameEnded");
    localStorage.removeItem("secondsElapsed");
  }

  const quizzContextValue: QuizzContextType = {
    steps,
    setSteps,
    totalPoints,
    setTotalPoints,
    pointsEarned,
    setPointsEarned,
    questionCount,
    setQuestionCount,
    totalCorrectAnswers,
    setTotalCorrectAnswers,
    category,
    difficulty,
    quizzType,
    setCategory,
    setDifficulty,
    setQuizzType,
    quizzData,
    loadingQuizz,
    fetchError,
    initQuizzData,
    playAgain,
    addPointsEarned,
    addTotalPoints,
    gameEnded,
    setGameEnded,
    playerName,
    playerGender,
    setPlayerName,
    setPlayerGender,
    secondsElapsed,
    setSecondsElapsed
  };

  return <QuizzContext.Provider value={quizzContextValue}>{children}</QuizzContext.Provider>;
}

export const useQuizzContext = () => {
  const context = useContext(QuizzContext)
  if (context === undefined) {
    throw new Error('useQuizzContext must be used within a QuizzContextProvider');
  }
  return context;
};

