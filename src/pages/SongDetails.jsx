import { useParams } from "react-router-dom";
const SongDetails = () => {
  const { songid } = useParams();

  console.log("song id is: ")
  console.log(songid)


  return <div>SongDetails</div>
}

export default SongDetails;
