import { useSelector } from "react-redux";
import { Loader, Error, SongCard } from "../components"
import { nyTopCharts } from "../assets/topCharts"
import { useGetTopChartsQuery } from "../redux/services/shazamCore";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
const Videos = () => {
  return (
    <div className="h-screen w-screen text-white text-4xl font-bold flex flex-row justify-items-center">
      Search for YouTube videos
    </div>
  )
}

export default Videos;
