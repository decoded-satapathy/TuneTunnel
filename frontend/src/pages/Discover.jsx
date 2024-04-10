import { Error, Loader, DiscoverSongCard, SongCard } from "../components";
import { genres, topCharts } from "../assets/constants.js";
import { useGetTopChartsQuery } from "../redux/services/shazamCore.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { selectGenreListId } from "../redux/features/playerSlice.js";
import { useGetSongsByGenreQuery } from "../redux/services/shazamCore.js";

function Discover() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const genreTitle = genreListId;
  // const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
  // console.log("data is : ")
  // console.log(data)


  const [isFetching, setIsFetching] = useState(true);
  setTimeout(() => {
    setIsFetching(false);
  }, 2000)
  const error = false;
  if (isFetching) return <Loader title="Loading songs...."></Loader>;

  if (error) return <Error></Error>;

  // generateTopCharts().then((topCharts) => {
  //   console.log("top charts in discover is : " + topCharts);
  // });

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-10 w-full ">
        <h2 className="text-3xl font-bold text-white ">
          Discover {genreTitle}
        </h2>
        {/* <select className="bg-black text-gray-300  p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"> */}
        {/*   onChange={(e) => dispatch(selectGenreListId(e.target.value))} */}
        {/*   value={genreListId || "Pop"} */}
        {/*   {genres.map((genre) => { */}
        {/*     return ( */}
        {/*       <option key={genre.value} value={genre.value}> */}
        {/*         {genre.title} */}
        {/*       </option> */}
        {/*     ); */}
        {/*   })} */}
        {/* </select> */}
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {topCharts.map((song, i) => {
          return (
            <SongCard
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={topCharts}
              song={song}
              i={i}
            ></SongCard>
          );
          // return <div>Hello</div>;
        })}
      </div>
    </div>
  );
}

export default Discover;
