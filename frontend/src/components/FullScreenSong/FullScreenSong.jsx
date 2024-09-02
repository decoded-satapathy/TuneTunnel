import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { All_API } from "../../../apis";
import { HighDefThumbnail } from "./HighDefThumbnail";
import axios from "axios";
import { useSelector } from "react-redux";

export function FullScreenSong() {

  const { activeSong } = useSelector((state) => state.player);
  const [lyricsArray, setLyricsArray] = useState([]);
  const [isLyricFetchSuccess, setIsLyricFetchSuccess] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const data = {
    "artist_name": activeSong.artist.name,
    "track_name": activeSong.name,
    "duration": activeSong.duration,
    "videoId": activeSong.videoId
  };
  useEffect(() => {
    async function fetchingLyrics() {
      // Fetch the lyrics
      const fetchedLyrics = await fetchLyrics(data);
      if (!fetchedLyrics) {
        setIsLyricFetchSuccess(false);
        return;
      }
      setIsLyricFetchSuccess(true);

      // Set the lyrics state
      setLyrics(fetchedLyrics);

      // Parse the lyrics and update the lyric array
      const lyricArr = parseLyrics(fetchedLyrics);
      setLyricsArray(lyricArr);
    }

    fetchingLyrics();
  }, []);

  console.log("activeSong:");
  console.log(activeSong);

  return <div className="h-full flex flex-row items-center justify-center gap-10 mt-16">
    <HighDefThumbnail videoId={data.videoId}></HighDefThumbnail>
    <div className="flex flex-col justify-start items-center h-[27rem] max-h-30rem] w-[50rem] overflow-y-scroll text-center text-2xl rounded-lg border-gray border-2 hide-scrollbar  p-4">

      {isLyricFetchSuccess ? (
        lyricsArray.map((lyric, index) => (
          <div key={index} className="text-white w-full whitespace-pre-wrap">
            {lyric}
            <br />
          </div>
        ))
      ) : (
        <div className="text-white">Lyrics not found</div>
      )}
    </div>
  </div>
}


function parseLyrics(lyrics) {
  const lyricsArr = lyrics.split("\n");
  return lyricsArr;
}

async function fetchLyrics(data) {
  if (!data.duration) {
    try {
      const response = await axios.get(`${All_API.songDetails}${data.videoId}`);
      data.duration = response.data.duration;
    } catch (e) {
      console.log(e);
    }
  }

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: All_API.lyrics,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  };

  try {
    const response = await axios.request(config);
    return response.data.lyrics;  // Returns the lyrics
  } catch (error) {
    console.error(error);
    return null;  // Returns null in case of error
  }
}
