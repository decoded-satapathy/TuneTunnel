import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { All_API } from "../../../apis";
import { HighDefThumbnail } from "./HighDefThumbnail";
import axios from "axios";

export function FullScreenSong() {
  const location = useLocation();
  // const { data } = location.state() || {};
  const [lyricsArray, setLyricsArray] = useState([]);
  const [lyrics, setLyrics] = useState("");
  const data = {
    "artist_name": "OneRepublic",
    "track_name": "Mirage (for Assassin's Creed Mirage)",
    "album_name": "Artificial Paradise (Deluxe)",
    "duration": 134,
    "videoId": "fsiPzT50ZiM"
  }
  useEffect(() => {
    async function fetchingLyrics() {
      // Fetch the lyrics
      const fetchedLyrics = await fetchLyrics(data);

      // Set the lyrics state
      setLyrics(fetchedLyrics);

      // Parse the lyrics and update the lyric array
      const lyricArr = parseLyrics(fetchedLyrics);
      setLyricsArray(lyricArr);
    }

    fetchingLyrics();
  }, []);

  console.log("lyrics");
  console.log(lyrics);

  return <div className="h-full flex flex-row items-center justify-center gap-10">
    <HighDefThumbnail videoId={data.videoId}></HighDefThumbnail>
    <div className="flex flex-col justify-center items-center max-h-72 w-[50rem] overflow-y-scroll text-center text-2xl rounded-lg border-gray border-2 hide-scrollbar pt-10">
      {lyricsArray.map((lyric) => {
        return <div className="text-white w-full">{lyric}</div>;
      })}
      <br />
    </div>
  </div>
}


function parseLyrics(lyrics) {
  console.log("lyrics")
  console.log(lyrics);
  const lyricsArr = lyrics.split("\n");
  return lyricsArr;
}

async function fetchLyrics(data) {

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3001/api/v1/lyrics/',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  };

  try {
    const response = await axios.request(config);
    console.log(response.data.lyrics);  // Logs the lyrics to the console
    return response.data.lyrics;  // Returns the lyrics
  } catch (error) {
    console.error(error);
    return null;  // Returns null in case of error
  }
}
