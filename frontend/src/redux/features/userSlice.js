import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  name: "Anonoymous"
}

const userSlice = createSlice({
  name: 'user',
  initialState,
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
