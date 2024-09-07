import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./Nonauth.css";
import {
  Searchbar,
  Sidebar,
  MusicPlayer,
  TopPlay,
  AudioPlayer,
} from "../components/index";
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  Base64Stream
} from "./";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchSong from "../components/SearchSong";
import { FullScreenSong } from "../components/FullScreenSong/FullScreenSong";
import { FullScreenArtist } from "../components/FullScreenArtist/FullScreenArtist";
import { FullScreenAlbum } from "../components/FullScreenAlbum/FullScreenAlbum";
import FullScreenTest from "./FullScreenTest";
const NonAuthPage = () => {
  const { activeSong } = useSelector((state) => state.player);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
  };
  return (
    <div className="relative flex flex-col w-screen h-screen bg-gradient-to-b from-[#330202] to-[#000000] overflow-y-scroll hide-scrollbar">
      <div className="fixed h-screen flex flex-col justify-center">
        <Sidebar />
      </div>
      <div>
        <Searchbar />
      </div>
      <div className="flex flex-col ml-[7rem]">
        <div className="max-h-[25rem] mr-7 mb-4 px-3 pb-2
         hide-scrollbar">
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/top-charts" element={<TopCharts />} />
            <Route path="/artist" element={<AroundYou />} />
            <Route path="/artists/:id" element={<ArtistDetails />} />
            <Route path="/songs/:songid" element={<SongDetails />} />
            <Route path="/search" element={<SearchSong />} />
            <Route path="/specific-song" element={<FullScreenTest />} />
            <Route
              path="/specific-artist/:artistId"
              element={
                <div className="">
                  <FullScreenArtist />
                </div>
              }
            />
            <Route path='/specific-album' element={<FullScreenAlbum />} />
            <Route path='/base64Stream/:videoId' element={<Base64Stream />} />
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
        <FullScreenTest />
      )}
    </div>
  )
};
export default NonAuthPage;
