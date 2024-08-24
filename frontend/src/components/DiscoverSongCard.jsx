import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const DiscoverSongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const oldSong = {
    photo_url: 'https://lh3.googleusercontent.com/iq44X6iu-jKqh6MOjj_SX_67Eh_0uh3elKcorkhf85HJzp-gzMEDkRinxZ9aM3Q4H55JWXro37gjvz4=w226-h226-l90-rj',
    rigntone: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/2d/4e/7b/2d4e7b94-5521-568f-f269-c8643001d32b/mzaf_1995669796140896759.plus.aac.ep.m4a",
  };

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ oldSong, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-md animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex`}
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
          // src='https://lh3.googleusercontent.com/iq44X6iu-jKqh6MOjj_SX_67Eh_0uh3elKcorkhf85HJzp-gzMEDkRinxZ9aM3Q4H55JWXro37gjvz4=w226-h226-l90-rj'
          src={song.thumbnails[0].url}
        />
        {/* {console.log(song.thumbnails)} */}
      </div>
      <div className="mt-4 flex flex-col">
        <div className="font-semibold text-lg text-white truncate">
          {/* <a href={`https://www.google.com/search?q=${title}+lyrics`} target="_blank" rel="noopener noreferrer">
            <span className="text-xl font-bold text-white">
              {song.name}
            </span>
          </a> */}
        </div>
        <div className="text-sm text-gray-300 truncate">
          <Link
            to={
              song.artists
                ? `/artists/${song.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.name}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DiscoverSongCard;
