import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  isSongLoading: true,
  isSongFullScreen: false,
  activeSong: {},
  // activeSong: {
  //   "type": "SONG",
  //   "videoId": "phLb_SoPBlA",
  //   "name": "Not Like Us",
  //   "artist": {
  //     "name": "Kendrick Lamar",
  //     "artistId": "UCprAFmT0C6O4X0ToEXpeFTQ"
  //   },
  //   "album": {
  //     "name": "Not Like Us",
  //     "albumId": "MPREb_KTxpHsPdd8z"
  //   },
  //   "duration": 275,
  //   "thumbnails": [
  //     {
  //       "url": "https://lh3.googleusercontent.com/8qk3C_zpd2FXHVN8BpMBFL6h9J5BlKlbcKOlvDMvIgBWBsAblDoTjU98RGbFH9DxtnN1X5zRzc9sSvWr=w60-h60-l90-rj",
  //       "width": 60,
  //       "height": 60
  //     },
  //     {
  //       "url": "https://lh3.googleusercontent.com/8qk3C_zpd2FXHVN8BpMBFL6h9J5BlKlbcKOlvDMvIgBWBsAblDoTjU98RGbFH9DxtnN1X5zRzc9sSvWr=w120-h120-l90-rj",
  //       "width": 120,
  //       "height": 120
  //     }
  //   ]
  // },
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      // if (action.payload?.data?.tracks?.hits) {
      //   state.currentSongs = action.payload.data.tracks.hits;
      // } else if (action.payload?.data?.properties) {
      //   state.currentSongs = action.payload?.data?.tracks;
      // } else {
      //   state.currentSongs = action.payload.data;
      // }

      // state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    setIsSongLoading(state, action) {
      state.isSongLoading = action.payload;
    },

    setIsSongFullScreen(state, action) {
      state.isSongFullScreen = action.payload;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId, setIsSongLoading, setIsSongFullScreen } = playerSlice.actions;

export default playerSlice.reducer;
