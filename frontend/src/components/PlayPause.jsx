// import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { SpinnerLoader } from "../assets/AnimatedComponents/Spinner";

const PlayPause = ({ isSongLoading, isPlaying, activeSong, song, handlePause, handlePlay }) => {
  if (isSongLoading && activeSong?.name === song.name) {
    return <SpinnerLoader height="10" width="10"></SpinnerLoader>
  }
  else if (isPlaying && activeSong?.name === song.name) {
    return <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  } else {
    return <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
  }
}




export default PlayPause;
