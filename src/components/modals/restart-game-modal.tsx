import { useModalContext } from "../../context/modal-context";
import { useQuizzContext } from "../../context/quizz-context";
import CustomModal from "../custom-modal";

export default function RestartGameModal() {
  const { restartGameModal, setRestartGameModal } = useModalContext();
  const { playAgain } = useQuizzContext();

  const restartGame = () => {
    playAgain();
    setRestartGameModal(false);
  };

  return (
    <CustomModal isOpen={restartGameModal} onClose={() => setRestartGameModal(false)}>
      <div className="flex flex-col items-center text-center bg-amber-50 p-8 rounded-2xl max-w-[420px]">
        <h2 className="mb-2 font-funnel text-2xl font-bold">Are you sure?</h2>
        <p className="font-medium">
          Are you sure you want to restart game? All accumulated points will be cleared if you do so.
        </p>
        <div className="flex justify-around w-full mt-5 flex-col gap-4">
          <button className="bg-red-500 text-white font-bold font-funnel py-3 px-12 rounded-2xl" onClick={restartGame}>
            Restart
          </button>
          <button
            className="bg-violet-500 text-white font-bold font-funnel py-3 px-12 rounded-2xl"
            onClick={() => setRestartGameModal(false)}
          >
            Continue
          </button>
        </div>
      </div>
    </CustomModal>
  );
}
