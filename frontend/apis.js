const BASE_URL = process.env.BACKEND_URL || "http://localhost:3001/";

export const All_API = {
  search: `${BASE_URL}api/v1/search?q=`,
  lyrics: `${BASE_URL}api/v1/lyrics`,
  artist: `${BASE_URL}api/v1/search/artist/`,
  songUrl: `${BASE_URL}api/v1/stream?videoId=`,
  album: `${BASE_URL}api/v1/search/album/`,
  songDetails: `${BASE_URL}api/v1/search/songDetail/`,

  // "search": "http://192.168.0.110:3001/api/v1/search?q=",
  // "lyrics": "http://192.168.0.110:3001/api/v1/lyrics",
  // "artist": "http://192.168.0.110:3001/api/v1/search/artist/",
  // "songUrl": "http://192.168.0.110:3001/api/v1/stream?videoId=",
  // "album": "http://192.168.0.110:3001/api/v1/search/album/",
  // "songDetails": "http://192.168.0.110:3001/api/v1/search/songDetail/",
  // "streamBase64": "http://192.168.0.110:3001/api/v1/streamBase64"
};
