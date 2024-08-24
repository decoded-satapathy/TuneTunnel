import { Loader, DiscoverSongCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
    dispatch(setAlbumId(albumId));
  };
  const [filterData, setfilterData] = useState([]);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/v1/search/homepage');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log("first");
        console.log(data);

        if (data) {
          let newFilterData = [];

          for (let i = 0; i < data.length; i++) {
            if (data[i] && Array.isArray(data[i].contents)) { 
              let albumsOnly = data[i].contents.filter(item => item && item.type === 'ALBUM'); 
              newFilterData = [...newFilterData, ...albumsOnly];
            }
          }

          setfilterData(newFilterData); 
          setTopCharts(newFilterData);  
          console.log("filtered");
          console.log(newFilterData); 
        } else {
          throw new Error('Unexpected data structure');
        }
      } catch (error) {
        console.error('Failed to fetch:', error);
        setTopCharts([]); 
      } finally {
        setIsFetching(false); 
      }
    };

    fetchHomePage();
  }, []); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
  };

  if (isFetching) return <Loader title="Loading songs...." />;

  console.log("topCharts");
  console.log(topCharts);

  return (
    <div className="flex flex-col mt-3">
      {topCharts.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 w-full ">
          <h2 className="text-3xl font-bold text-white ">
            Discover
          </h2>
        </div>
      )}
      <div className="sm:justify-start justify-center gap-8">
        <Slider {...settings}>
          {topCharts.map((song, i) => (
            <Link 
              key={i} 
              to={`/album/${song.albumId}`}
              onClick={() => albumStateHandle(song.albumId)} 
            >
              <DiscoverSongCard
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={topCharts} 
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
