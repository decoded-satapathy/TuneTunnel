import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albumnID:"",
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbumId: (state, action) => {
       state.albumnID = action.payload;
    },
    clearAlbumId: (state) => {
      state.albumnID = "";
    }
  }
});

export const { setAlbumId, clearAlbumId } = albumSlice.actions;

export default albumSlice.reducer;
