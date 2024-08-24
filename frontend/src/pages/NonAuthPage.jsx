import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './Nonauth.css';
import { Searchbar, Sidebar, MusicPlayer, TopPlay, AudioPlayer } from '../components/index';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './';
import { useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchSong from '../components/SearchSong';
import { FullScreenSong } from '../components/FullScreenSong/FullScreenSong';
import { FullScreenArtist } from '../components/FullScreenArtist/FullScreenArtist';
const NonAuthPage = () => {
  const { activeSong } = useSelector((state) => state.player);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3
  };
  return (
    <div className="relative flex flex-col w-screen h-screen bg-gradient-to-b from-[#9a0f0f] to-[#2e0101] overflow-y-scroll ">
      {/* <AudioPlayer /> */}
      <Sidebar />
      <div>
        <Searchbar />
      </div>
      <div className='flex flex-col ml-[7rem]' >

        <div className="max-h-[25rem] mr-7 mb-4 px-3 pb-2">


          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/top-charts" element={<TopCharts />} />
            <Route path="/around-you" element={<AroundYou />} />
            <Route path="/artists/:id" element={<ArtistDetails />} />
            <Route path="/songs/:songid" element={<SongDetails />} />
            <Route path="/search" element={<SearchSong />} />
            <Route path="/specific-song" element={<FullScreenSong />} />
            <Route path="/specific-artist" element={<div className=''><FullScreenArtist /></div>} />
          </Routes>

        </div>
        {/* <div className='h-[calc(100vh-72px)]  overflow-y-scroll hide-scrollbar lex xl:flex-row flex-col-reverse'>
        <TopPlay />
        </div> */}
        {/* <div className="flex xl:flex-row flex-col-reverse">
      
          <div className="xl:sticky relative top-0 h-fit">
          <TopPlay />
          </div>
        </div> */}
      </div>



      {/* <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40 ">
            
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            
          </div>
        </div> */}

      {activeSong?.name && (
        <div className="absolute h-24 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/50 to-[#05050c] backdrop-blur-sm rounded-t-3xl z-10 w-[70%] mx-auto">
          <MusicPlayer />
        </div>
      )};

    </div>
  )
};
export default NonAuthPage;
