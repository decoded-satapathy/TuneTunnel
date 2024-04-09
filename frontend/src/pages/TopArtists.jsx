import { Loader, Error, ArtistCard } from "../components"
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

const TopArtists = () => {

  // const { data, isFetching, error } = useGetTopChartsQuery();
  const isFetching = false;
  const error = false;

  if (isFetching) return <Loader title="Loading top artists" />;
  if (error) return <Error></Error>


  return (
    <div className="flex flex-col">
      <h2 className="flex flex-row justify-start items-center gap-3 font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Artists
        <div className="flex flex-row justify-start items-center gap-3">
        </div>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {nyTopCharts?.map((track) => {
          return <ArtistCard
            key={track.key}
            track={track}
          ></ArtistCard>
        })}
      </div>
    </div>
  )
}

export default TopArtists;
