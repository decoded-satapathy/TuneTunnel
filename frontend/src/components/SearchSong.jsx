import React from 'react'
import { useLocation } from 'react-router-dom';
import SearchedSongCard from './SearchedSongCard'
import { useSelector } from 'react-redux';

function SearchSong() {
  const location = useLocation();
  const { data } = location.state || {};
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // console.log(isPlaying);
  return (

    <div className='h-[70vh] w-[50%] ml-[19rem] rounded-xl' >
      <div className='  flex flex-col justify-start h-full w-full text-white overflow-y-auto hide-scrollbar py-5'>

        {data.map((song, index) => {
          return (
            <SearchedSongCard key={index} song={song} activeSong={activeSong} isPlaying={isPlaying} />
          )
        })}
      </div>
    </div>
  )
}

export default SearchSong
