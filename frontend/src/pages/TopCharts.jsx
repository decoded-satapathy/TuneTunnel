import { useSelector } from "react-redux";
import { Loader, Error, SongCard } from "../components"
import { nyTopCharts } from "../assets/topCharts"
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const TopCharts = () => {

  const { activeSong, isPlaying } = useSelector((state) => state.player);


  // const { data, isFetching, error } = useGetTopChartsQuery();
  const isFetching = false;
  const error = false;

  if (isFetching) return <Loader title="Loading top artists" />;
  if (error) return <Error></Error>
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 5
  };

  return (
    <div className="flex flex-col">
      <h2 className="flex flex-row justify-start items-center gap-3 font-bold text-3xl text-white text-left mb-10">
        Discover Top Charts
        <div className="flex flex-row justify-start items-center gap-3">
        </div>
      </h2>
      <div className="sm:justify-start justify-center gap-8">
      <Slider {...settings}>
        {nyTopCharts?.map((song, i) => {
          return <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={nyTopCharts}
          ></SongCard>
        })}
        </Slider>
      </div>
    </div>
  )
}

export default TopCharts;
