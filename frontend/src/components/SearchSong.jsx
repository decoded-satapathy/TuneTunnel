import React from 'react'
import { useLocation } from 'react-router-dom';
import SearchedSongCard from './SearchedSongCard'

function SearchSong() {
    const location = useLocation();
    const { data } = location.state || {};
    
  return (
    
    <div className='h-[75vh] w-[50%] bg-white/70 mx-auto rounded-xl' >
        <div className='  flex flex-col justify-start h-full w-full text-white overflow-y-auto hide-scrollbar py-5'>

            {data.map((song,index) => {
                return (
                    <SearchedSongCard  key={index} song={song}/>
                )
            } )}
        </div>
    
    </div>
  )
}

export default SearchSong