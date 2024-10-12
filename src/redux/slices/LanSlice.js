import { createSlice } from "@reduxjs/toolkit";

const LanSlice = createSlice({
  name: "lan",
  initialState: {
    lan: "",
  },
  reducers: {
    updateLan(state, action) {
      state.lan = action.payload;
    },
  },
});

export default LanSlice;
export const { updateLan } = LanSlice.actions;
