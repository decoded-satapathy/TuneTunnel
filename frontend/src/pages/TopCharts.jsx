import { useSelector } from "react-redux";
import { Loader, Error, SongCard } from "../components"
import { nyTopCharts } from "../assets/topCharts"
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopCharts = () => {

  const { activeSong, isPlaying } = useSelector((state) => state.player);


  // const { data, isFetching, error } = useGetTopChartsQuery();
  const isFetching = false;
  const error = false;

  if (isFetching) return <Loader title="Loading top artists" />;
  if (error) return <Error></Error>


  return (
    <div className="flex flex-col">
      <h2 className="flex flex-row justify-start items-center gap-3 font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
        <div className="flex flex-row justify-start items-center gap-3">
        </div>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {nyTopCharts?.map((song, i) => {
          return <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={nyTopCharts}
          ></SongCard>
        })}
      </div>
    </div>
  )
}

export default TopCharts;
