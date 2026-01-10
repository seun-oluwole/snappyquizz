import { useNavigate, type NavigateFunction } from "react-router";
import Button from "./components/button";
import ViewContainer from "./components/view-container";
import PlayerDetails from "./components/player-details";
import { useQuizzContext } from "./context/quizz-context";
import { useModalContext } from "./context/modal-context";
import GetStartedModal from "./components/modals/get-started-modal";

export default function App() {
  const navigate: NavigateFunction = useNavigate();
  const { playerName } = useQuizzContext();
  const { setGetStartedModal } = useModalContext();

  const handleGetStarted = () => {
    if (!playerName) {
      setGetStartedModal(true);
    } else {
      navigate("play")
    }
  }

  return (
    <ViewContainer>
      <div className="flex flex-col px-5 w-full top-7 absolute">
        {playerName && <PlayerDetails />}
      </div>
      <div className="flex flex-col text-white">
        <h1 className="text-[2.2rem] text-white font-funnel font-bold  mb-10 md:text-5xl">⚡️SnappyQuizz⚡️</h1>
        <Button handleClick={handleGetStarted}>Get started</Button>
      </div>
    <GetStartedModal />
    </ViewContainer>
  );
}
