import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader } from "../"
import { SongBar } from "../index"
import { All_API } from "../../../apis";
import axios from "axios";

export const FullScreenAlbum = () => {
  const location = useLocation();
  const { artistId } = location.state || {};

  // const { data } = location.state || {};
  // const { data } = location.state() || {};
  const [isLoading, setIsLoading] = useState(true); // Initially true because we're fetching data
  const [artistDetails, setArtistDetails] = useState({});

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const finalApi = All_API.artist + artistId;
      try {
        const response = await fetch(finalApi);
        const jsonRes = await response.json();
        console.log(JSON.stringify(jsonRes));
        setArtistDetails(jsonRes);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false); // Ensure loading state is set to false after data is fetched
      }
    };

    fetchArtistDetails();
  }, []); // Empty dependency array means this effect runs once after the initial render

  if (isLoading) {
    return <Loader title="Fetching artist details" />;
  }
  // console.log(`${All_API.artist}/UCDxKh1gFWeYsqePvgVzmPoQ`);
  // TODO: if nrtisteed to see the component real quick uncomment the following
  // return (
  //   <div className="flex flex-col mt-10 hidescrollbar">
  //     <DetailsHeader artistInfo={BesonBoone}></DetailsHeader>
  //     <div className="mb-10">
  //       <div className="mt-5">
  //
  //         <div className='text-3xl font-bold text-white my-10'>Top Songs:</div>
  //         {BesonBoone.tracks.hits.map((hitSong, i) => {
  //           return <SongBar hitSongDetails={hitSong} i={i}></SongBar>
  //
  //         })}
  //       </div>
  //     </div>
  //   </div>
  // )

  console.log(artistDetails);

  return (
    <div className="flex flex-col mt-10 hidescrollbar">
      <DetailsHeader artistInfo={artistDetails}></DetailsHeader>
      <div className="mb-10 row-span-1 sm:col-span-1">
        <div className="mt-5">
          <div className='text-3xl font-bold text-white my-10'>Top Songs:</div>
          {artistDetails.topSongs.map((song, i) => {
            return <SongBar songDetails={song} i={i}></SongBar>
          })}
        </div>
      </div>
    </div>
  )


};

