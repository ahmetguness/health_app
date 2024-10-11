import { configureStore } from "@reduxjs/toolkit";
import LanSlice from "./slices/LanSlice";

const store = configureStore({
  reducer: {
    lan: LanSlice.reducer,
  },
});

export default store;
