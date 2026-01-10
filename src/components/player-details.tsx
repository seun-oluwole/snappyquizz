import femaleImg from "../assets/female.jpg";
import maleImg from "../assets/male.jpg";
import { useQuizzContext } from "../context/quizz-context";
import { FaUserCircle } from "react-icons/fa";

export default function PlayerDetails() {
  const { totalPoints, playerName, playerGender } = useQuizzContext();

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <div>
          {!playerGender ? (
            <FaUserCircle className="h-13 w-13 text-white/80" />
          ) : (
            <>
              <div className="flex items-center mr-2 h-12 w-12 rounded-[50%] outline-2 outline-offset-2 outline-violet-100">
                {playerGender === "Male" && <img src={maleImg} alt="user icon" className="rounded-[50%]" />}
                {playerGender === "Female" && <img src={femaleImg} alt="user icon" className="rounded-[50%]" />}
              </div>
            </>
          )}
        </div>

        <span className="text-white text-lg font-semibold">{playerName}</span>
      </div>
      <div className="flex items-center justify-center h-11 w-21 bg-violet-500 text-white text-lg font-semibold rounded-2xl outline-2 outline-offset-2 outline-violet-100">
        💎 {totalPoints}
      </div>
    </div>
  );
}
