import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { All_API } from "../../../apis";
import { HighDefThumbnail } from "./HighDefThumbnail";

export function FullScreenSong() {
  const location = useLocation();
  // const { data } = location.state() || {};
  const data = {
    "artist_name": "Arijit Singh",
    "track_name": "Tum Hi Ho",
    "album_name": "Aashiqui 2",
    "duration": 262,
    "videoId": "fsiPzT50ZiM"
  }
  const [lyrics, setLyrics] = useState("");
  useEffect(() => {
    async function fetchingLyrics() {
      const props = {
        "artist_name": data.artist_name,
        "track_name": data.track_name,
        "album_name": data.album_name,
        "duration": data.duration
      }
      const res = await fetchLyrics(props)
      setLyrics(res);
    }

    fetchingLyrics();
  }, [])

  const lyricArray = parseLyrics(lyrics);
  return <div className="h-full flex flex-row items-center justify-center gap-10">
    <HighDefThumbnail videoId={data.videoId}></HighDefThumbnail>
    <div className="flex flex-col justify-center items-center max-h-72 w-[50rem] overflow-y-scroll text-center text-2xl rounded-lg border-gray border-2 hide-scrollbar pt-10">
      {lyricArray.map((lyric) => {
        return <div className="text-white w-full">{lyric}</div>;
      })}
      <br />
    </div>
  </div>
}


function parseLyrics(lyrics) {

  const lyricsArr = lyrics.split("\n");

  return lyricsArr;
}

async function fetchLyrics(props) {
  const response = await fetch(All_API.lyrics, {
    body: JSON.stringify({
      "artist_name": props.artist_name,
      "track_name": props.track_name,
      "album_name": props.album_name,
      "duration": props.duration
    })

  })
  response = await response.json();

  return response.lyrics;
}
