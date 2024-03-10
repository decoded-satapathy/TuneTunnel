const DetailsHeader = ({ artistInfo }) => (
  <div className="bg-gradient-to-l from-transparent to-black w-full">
    <div className=" flex flex-row justify-evenly items-center">
      <img src={artistInfo.artist.hits[0].artist.avatar} className="rounded-full border-2 border-gray-300 shadow-2xl shadow-gray-600 h-32 w-32 sm:h-48 sm:w-48 m-5" />
      <p className="text-white text-3xl font-bold">{artistInfo.artist.hits[0].artist.name}</p>
    </div>
  </div>
);

export default DetailsHeader;
