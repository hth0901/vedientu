import { createSlice } from "@reduxjs/toolkit";

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    danhSachTour: [],
  },
  reducers: {
    truyvanDanhSachTour(state, action) {
      state.danhSachTour = action.payload.items;
    },
  },
});

export const tourActions = tourSlice.actions;

export default tourSlice;