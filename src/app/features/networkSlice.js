import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOnline: true,
};

const networkSlice = createSlice({
  name: "network",
  initialState: initialState,
  reducers: {
    networkMode: (state, action) => {
      state.isOnline = action.payload;
    },
  },
});

export const { reducer: networkReducer } = networkSlice;
export const selectNetwork = ({ network }) => network;
export const {
  isOpenCartDrawer,
  onCloseCartDrawerAction,
  onOpenCartDrawerAction,
} = networkSlice.actions;
