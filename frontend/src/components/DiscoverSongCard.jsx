
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const DiscoverSongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const oldSong = {
    photo_url: song.images.coverart,
    rigntone: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/2d/4e/7b/2d4e7b94-5521-568f-f269-c8643001d32b/mzaf_1995669796140896759.plus.aac.ep.m4a",

  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ oldSong, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title
            ? "flex bg-black bg-opacity-100"
            : "hidden"
            }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          className="object-cover h-56"
          alt="song_img"
          src={song.images.coverart}
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <a href={`https://www.google.com/search?q=${song?.title}+lyrics`} target="_blank">
            <p className="text-xl font-bold text-white">
              {song?.title}
            </p>
          </a>
        </p>
        <p className="text-sm text-gray-300 truncate">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div >
  );
};

export default DiscoverSongCard;
