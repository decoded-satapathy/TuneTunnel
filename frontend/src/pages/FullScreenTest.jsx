import React, { useState, useEffect } from 'react';
import { MusicPlayer } from '../components';
import { FullScreenSong } from '../components/FullScreenSong/FullScreenSong';
import { useSelector, useDispatch } from 'react-redux';
import { setIsSongFullScreen } from '../redux/features/playerSlice';



const FullScreenTest = () => {
  const dispatch = useDispatch();

  const { activeSong, isSongFullScreen } = useSelector((state) => state.player);

  const toggleFullScreen = () => {
    dispatch(setIsSongFullScreen(!isSongFullScreen))
  };

  return (
    <div className="relative">
      <div
        className={`fixed left-0 right-0 bg-gradient-to-br from-white/50 to-[#05050c] backdrop-blur-sm ${!isSongFullScreen ? `rounded-t-3xl` : ``} z-10 mx-auto  transition-all duration-500 ease-in-out transform origin-bottom ${isSongFullScreen
          ? 'h-full w-full bottom-0'
          : 'h-24 w-[70%] bottom-0'
          }`}
        style={{ transitionProperty: 'height, width' }}
      >
        <div
          className={`flex pt-4 ${isSongFullScreen ? 'flex-col items-center justify-center' : 'items-center'}`}
        >
          <MusicPlayer />
          {isSongFullScreen && (
            <div className="text-center mt-5 text-white">
              <FullScreenSong />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullScreenTest;
