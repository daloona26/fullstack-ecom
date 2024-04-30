import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState: initialState,
  reducers: {
    isOpenCartDrawer: (state) => {
      state.isOpenCartDrawer = !state.isOpenCartDrawer;
    },
    onOpenCartDrawerAction: (state) => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    onCloseCartDrawerAction: (state) => {
      state.onCloseCartDrawer = false;
      state.isOpenCartDrawer = false;
    },
  },
});

export const { reducer: globalReducer } = globalSlice;
export const selectGlobal = ({ global }) => global;
export const {
  isOpenCartDrawer,
  onCloseCartDrawerAction,
  onOpenCartDrawerAction,
} = globalSlice.actions;
