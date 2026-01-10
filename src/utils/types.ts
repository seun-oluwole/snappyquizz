export interface QuizzContextType {
  steps: number;
  totalPoints: number;
  pointsEarned: number;
  questionCount: number;
  totalCorrectAnswers: number;
  playerName: string;
  playerGender: string;
  category: string;
  difficulty: string;
  quizzType: string;
  setPointsEarned: React.Dispatch<React.SetStateAction<number>>;
  setTotalPoints: React.Dispatch<React.SetStateAction<number>>;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  setQuestionCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setDifficulty: React.Dispatch<React.SetStateAction<string>>;
  setQuizzType: React.Dispatch<React.SetStateAction<string>>;
  setGameEnded: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerName: React.Dispatch<React.SetStateAction<string>>;
  setPlayerGender: React.Dispatch<React.SetStateAction<string>>;
  quizzData: QuizzData[];
  loadingQuizz: boolean;
  fetchError: unknown;
  gameEnded: boolean;
  initQuizzData: () => Promise<void>;
  playAgain: () => void;
  addPointsEarned: (points: number) => void;
  addTotalPoints: () => void;
}

export interface ModalContextType {
  restartGameModal: boolean;
  getStartedModal: boolean;
  setRestartGameModal: React.Dispatch<React.SetStateAction<boolean>>;
  setGetStartedModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface QuizzData {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

