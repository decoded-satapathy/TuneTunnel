import React from 'react';
import { Link } from 'react-router-dom';

import PlayPause from './PlayPause';
import { HiTag } from 'react-icons/hi';
function toCapitalCase(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const SongBar = ({ song, i, hitSongDetails, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e]  py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-20 h-20 rounded-lg"
        src={hitSongDetails?.images?.play}
        alt={hitSongDetails?.heading.title}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <a href={`https://www.google.com/search?q=${hitSongDetails?.heading?.title}+by+${hitSongDetails.heading.subtitle}+lyrics`} target="_blank">
          <p className='text-white text-2xl '>
            {toCapitalCase(hitSongDetails.heading.title)}
          </p>
        </a>
        <p className='text-gray-300 text-base '>
          {hitSongDetails.heading.subtitle}
        </p>
      </div>
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
