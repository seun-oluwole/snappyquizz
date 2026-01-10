import { useState } from "react";
import { useModalContext } from "../../context/modal-context";
import CustomModal from "../custom-modal";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { useNavigate } from "react-router";
import { useQuizzContext } from "../../context/quizz-context";
import { FaAngleLeft } from "react-icons/fa";

export default function GetStartedModal() {
  const [steps, setSteps] = useState<number>(1);
  const { getStartedModal, setGetStartedModal } = useModalContext();
  const { playerGender, playerName, setPlayerGender, setPlayerName } = useQuizzContext();
  const navigate = useNavigate();

  const handleNavigate: () => void = () => {
    setGetStartedModal(false);
    navigate("play")
  } 

  const handleInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
   setPlayerName(e.target.value)
  }

  function handleGetStarted() {
    localStorage.setItem("playerName", playerName);
    setSteps((prev: number) => prev + 1)
  }



  return (
    <CustomModal isOpen={getStartedModal} onClose={() => setGetStartedModal(false)}>
      <div className="flex flex-col items-center text-center bg-amber-50 p-5 rounded-2xl w-[320px] gap-4 md:w-[390px]">
        {steps === 1 && (
          <>
            <h2 className="font-medium font-funnel text-xl mb-3">What's your name?</h2>
            <div className="flex flex-col gap-6 w-full">
              <input type="text" value={playerName} placeholder="Enter your name." onChange={handleInput} className="py-3 px-5 bg-gray-300 font-funnel text-lg rounded-2xl outline-none" />
              <button disabled={!playerName} onClick={handleGetStarted} className="w-full h-12 text-white text-lg font-medium bg-amber-500 hover:bg-amber-500/90 rounded-2xl">
                Continue
              </button>
            </div>
          </>
        )}
        {steps === 2 && (
          <>
            <div className="flex items-center relative">
              <FaAngleLeft className="h-6 w-6 absolute left-[-72px]" onClick={() => setSteps(1)}/>
              <h2 className="font-medium font-funnel text-xl">Choose gender</h2>
            </div>
            <div className="font-semibold font-funnel text-lg text-gray-500">{playerGender}</div>
            <div className="flex w-full gap-3">
              <button className="flex items-center justify-center w-full h-12 gap-2 text-white text-lg font-medium bg-sky-500 hover:bg-sky-500/90 rounded-2xl" onClick={() => setPlayerGender("Male")}>Male <IoMdMale className="h-6 w-6"/> </button>
              <button className="flex items-center justify-center w-full h-12 gap-2 text-white text-lg font-medium bg-pink-500 hover:bg-pink-500/90 rounded-2xl" onClick={() => setPlayerGender("Female")}>Female <IoMdFemale className="h-6 w-6"/> </button>
            </div>
            <button onClick={handleNavigate} className="w-full h-12 text-white text-lg font-medium bg-amber-500 hover:bg-amber-500/90 rounded-2xl">
              Continue
            </button>
          </>
        )}
      </div>
    </CustomModal>
  );
}
