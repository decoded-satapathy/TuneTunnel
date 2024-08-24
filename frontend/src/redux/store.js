import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import userReducer from "./features/userSlice";
import albumnReducer from "./features/albumSlice";
import { shazamCoreApi } from "./services/shazamCore";

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    user: userReducer,
    albumn: albumnReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
