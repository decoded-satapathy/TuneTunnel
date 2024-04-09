import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader } from "../components"
import { BesonBoone } from "../assets/artistDetails"
import { useSearchGloballyQuery } from "../redux/services/shazamCore";
import { SongBar } from "../components/index"

const ArtistDetails = () => {
  const { id } = useParams();
  // const { data, isFetching, error } = useSearchGloballyQuery(id);
  // console.log("id: ")
  // console.log(id)
  // console.log(BesonBoone.artist.hits[0].artist.avatar)
  if (false) {
    return <Loader title="Fetching artist details"></Loader>
  }

  return (
    <div className="flex flex-col mt-10">
      <DetailsHeader artistInfo={BesonBoone}></DetailsHeader>
      <div className="mb-10">
        <div className="mt-5">

          <div className='text-3xl font-bold text-white my-10'>Top Songs:</div>
          {BesonBoone.tracks.hits.map((hitSong, i) => {
            return <SongBar hitSongDetails={hitSong} i={i}></SongBar>

          })}
        </div>
      </div>
    </div>
  )
};

export default ArtistDetails;
