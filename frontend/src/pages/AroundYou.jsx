import React, { useState, useEffect } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { All_API } from '../../apis';
import { Loader } from '../components';
function AroundYou() {
  const [artistDetails, setArtistDetails] = useState([]);
  
  const artists = {
    "ar_rahman": "UCtJe0RYzgPddQXKtWduxz_w",
    "arijit_singh": "UCDxKh1gFWeYsqePvgVzmPoQ",
    "honey_singh": "UCGPCYz1FTl_dvFFnzQTQzjw",
    "shreya_ghosal": "UCrC-7fsdTCYeaRBpwA6j-Eg",
    "Atif Aslam": "UCVGomUS__PL0c4jDXa0QwXA",
    "K.K.":"UCeBxx7m7yrwSyvpVpKcMI8w"
  };

  useEffect(() => {
    async function fetchArtistDetails() {
      try {
        const fetchedDetails = [];
        
        for (const artistId of Object.values(artists)) {
          const fullUrl = All_API.artist+"/"+artistId;
          console.log(fullUrl)
          const response = await fetch(fullUrl);
          const data = await response.json();
          fetchedDetails.push(data);  
        }

        setArtistDetails(fetchedDetails);  

      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    }

    fetchArtistDetails();
  }, []); 

  return (
    <div className='grid grid-cols-5 gap-4'>
      {artistDetails.length > 0 ? (
        artistDetails.map((details, index) => (
          <div key={index} className="rounded-xl bg-gradient-to-l from-gray-900 via-transparent to-gray-900 w-[100%] h-[100%] flex flex-row justify-space-between">
            <div className=" flex flex-col">
              <img src={details.thumbnails[1].url} className="rounded-full shadow-2xl shadow-gray-600 h-32 w-32 sm:h-48 sm:w-48 m-5 object-cover" />
              <div className='text-white px-5 '>
                <p className="text-white text-2xl font-bold ">{details.name}</p>
                <p className='pb-2'>Artist</p>
              </div>
              
            </div>
          </div>
        ))
      ) : (
        <div ><Loader/></div>
        
      )}
    </div>
  );
}

export default AroundYou;
