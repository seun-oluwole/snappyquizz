import Header from "../components/header";
import Preference from "../components/preference";
import ViewContainer from "../components/view-container";
import QuizzInterface from "../components/quizz-interface";
import QuizzResult from "../components/quizz-result";
import { useQuizzContext } from "../context/quizz-context";
import RestartGameModal from "../components/modals/restart-game-modal";

export default function PlayQuizz() {
  const { steps } = useQuizzContext();

  return (
    <>
      <Header />
      <ViewContainer>
        <RestartGameModal />
        {steps === 1 && <Preference />}
        {steps === 2 && <QuizzInterface />}
        {steps === 3 && <QuizzResult />}
      </ViewContainer>
    </>
  );
}
