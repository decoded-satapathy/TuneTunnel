import { Error as ErrorComponent, Loader, DiscoverSongCard, SongCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { selectGenreListId } from "../redux/features/playerSlice.js";
import { setAlbumId } from "../redux/features/albumSlice";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function Discover() {
  const [topCharts, setTopCharts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
  const genreTitle = genreListId;

  const albumStateHandle = (albumId) => {
    dispatch(setAlbumId(albumId)); // Dispatch the selected album's ID
  };

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/v1/search/homepage');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log(data);
        if (data) {
          setTopCharts(data);
        } else {
          throw new Error('Unexpected data structure');
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
        setTopCharts([]); // Ensure topCharts is an array
      } finally {
        setIsFetching(false); // Set isFetching to false whether successful or not
      }
    };

    fetchHomePage();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3
  };

  if (isFetching) return <Loader title="Loading songs...."></Loader>;

  const albumObj = topCharts[0];
  // console.log(albumObj.contents);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 w-full ">
        <h2 className="text-3xl font-bold text-white ">
          {albumObj.title} {genreTitle}
        </h2>
      </div>
      <div className="sm:justify-start justify-center gap-8">
        <Slider {...settings}>
          {albumObj.contents.map((song, i) => (
            <Link 
              key={i} 
              to={`/album/:album_id`}
              onClick={() => albumStateHandle(song.playlistId)} // Pass the album ID to the handler
            >
              <DiscoverSongCard
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={albumObj.contents}
                song={song}
                i={i}
              />
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Discover;
