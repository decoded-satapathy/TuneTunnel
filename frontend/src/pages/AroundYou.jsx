import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Loader, Error, SongCard } from "../components";
import { india } from "../assets/topCountrySongs";
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
const geoipifyApiKey = import.meta.env.VITE_GEO_API_KEY;

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState("");

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  // const { data, isFetching, error } = useGetSongsByCountryQuery(country);
  const isFetching = false;
  const error = false;
  useEffect(() => {
    axios
      .get(`https://geo.ipify.org/api/v2/country?apiKey=${geoipifyApiKey}`)
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  // if (isFetching && loading) return <Loader title="Loading songs around you" />;
  // if (error && country) return <Error></Error>

  return (
    <div className="flex flex-col">
      <h2 className="flex flex-row justify-start items-center gap-3 font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You
        <div className="flex flex-row justify-start items-center gap-3">
          <div className="font-black ">({country})</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 "
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
        </div>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {india?.map((song, i) => {
          return (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={india}
            ></SongCard>
          );
        })}
      </div>
    </div>
  );
};

export default AroundYou;
