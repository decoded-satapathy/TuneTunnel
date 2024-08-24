import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';
import { HiTag } from 'react-icons/hi';
function toCapitalCase(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const SongBar = ({ song, i, songDetails, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e]  py-2 p-4 rounded-lg cursor-pointer mb-2 justify-between `}>
    <div>
      <div className="flex-1 flex flex-row justify-between items-center">
        <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
        <img
          className="w-20 h-20 rounded-lg"
          src={songDetails?.thumbnails[0].url}
          alt={songDetails?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <a href={`https://www.google.com/search?q=${songDetails?.name}+by+${songDetails?.artist.name}+lyrics`} target="_blank">
            <p className='text-white text-2xl '>
              {toCapitalCase(songDetails?.name)}
            </p>
          </a>
          <p className='text-gray-300 text-base '>
            {songDetails.artist.name}
          </p>
        </div>
      </div>
    </div>

    <div>
      <PlayPause />
    </div>
    {/* {!artistId */}
    {/*   ? ( */}
    {/*     <PlayPause */}
    {/*       isPlaying={isPlaying} */}
    {/*       activeSong={activeSong} */}
    {/*       song={song} */}
    {/*       handlePause={handlePauseClick} */}
    {/*       handlePlay={() => handlePlayClick(song, i)} */}
    {/*     /> */}
    {/*   ) */}
    {/*   : null} */}
  </div>
);

export default SongBar;
