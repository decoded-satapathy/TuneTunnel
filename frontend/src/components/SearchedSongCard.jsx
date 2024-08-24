import React from 'react'
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { All_API } from '../../apis';
import { useLocation, useNavigate } from 'react-router-dom';


function SearchedSongCard({ artistId, song, isPlaying, activeSong, data, i }) {
    const songplay = All_API.songUrl + song.videoId;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = () => {
    // dispatch(setActiveSong({ song, data, i }));
    console.log(song);
    dispatch(setActiveSong({ song }));
    dispatch(playPause(true));
  };
  function nameHandler(){
    navigate("/specific-artist",{state:{artistId}})
  }
  return (

        <div className='flex gap-5 mb-5 justify-start mx-8 backdrop-blur-xl hover:bg-[#4c426e] hover:backdrop-blur-lg py-2 px-3 rounded-lg cursor-pointer hover:text-red-400 w-[90%]'>
            <div className='h-[60px] w-[60px] object-contain relative '>
                <img src={song.thumbnails[0].url} className='rounded-full absolute z-1'></img>
                <div className='z-100 absolute top-3 left-3'>
                  <PlayPause
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  song={song}
                  handlePause={handlePauseClick}
                  handlePlay={handlePlayClick}
                  />
                </div>
                
            </div>
            <div className=''>
                <h2 className='font-bold text-lg mb-1' >{song.album.name}</h2>
                <p onClick={nameHandler} className='underline text-sm mb-1' >{song.artist.name}</p>
            </div>
        </div>
  )
}

export default SearchedSongCard
