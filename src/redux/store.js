import { configureStore } from "@reduxjs/toolkit";
import LanSlice from "./slices/LanSlice";
import RefreshSlice from "./slices/RefreshSlice";

const store = configureStore({
  reducer: {
    lan: LanSlice.reducer,
    refresh: RefreshSlice.reducer,
  },
});

export default store;
