// import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.videoId === song.videoId ? (
    <FaPauseCircle size={35} className="text-gray-300 " onClick={handlePause} />
  ) : (
    <FaPlayCircle size={35} className="text-gray-300" onClick={handlePlay} />
    // <FaPauseCircle />
  );

export default PlayPause;
