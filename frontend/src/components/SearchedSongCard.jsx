import React from 'react'
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { All_API } from '../../apis';


function SearchedSongCard({ song, isPlaying, activeSong, data, i }) {
    const songplay = All_API.songUrl + song.videoId;
    const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    dispatch(setActiveSong({ songplay, data, i }));
    dispatch(playPause(true));
  };
  return (
        <div className='flex gap-5 mb-5 justify-start mx-8 backdrop-blur-xl hover:bg-[#4c426e]/50 hover:backdrop-blur-lg py-2 px-3 rounded-lg cursor-pointer hover:text-red-400 w-full'>
            <div className='h-[60px] w-[60px] object-contain '>
                <img src={song.thumbnails[0].url} className='rounded-full'></img>
                <PlayPause
                isPlaying={isPlaying}
                activeSong={activeSong}
                song={song}
                handlePause={handlePauseClick}
                handlePlay={handlePlayClick}
                />
            </div>
            <div className=''>
                <h2 className='font-bold text-lg mb-1' >{song.album.name}</h2>
                <p className='underline text-sm mb-1' >{song.artist.name}</p>
            </div>
        </div>
    
  )
}

export default SearchedSongCard