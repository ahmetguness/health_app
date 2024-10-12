import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refresh",
  initialState: {
    refreshNeeded: false,
  },
  reducers: {
    triggerRefresh(state) {
      state.refreshNeeded = !state.refreshNeeded;
    },
  },
});

export default refreshSlice;
export const { triggerRefresh } = refreshSlice.actions;
