import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    name: "Anonoymous"
  },
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    }
  },
});

export const { login, logout, changeName } = userSlice.actions;

export default userSlice.reducer;
