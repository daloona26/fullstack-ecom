import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";

const { toast } = createStandaloneToast();

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/local`,
        user
      );
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data); // Pass error data to the rejected action payload
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error when request starts
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        const date = new Date();
        const DAYS = 3;
        const HOURS = 1000 * 60 * 60 * 24;
        const EXPIRES = HOURS * DAYS;
        date.setTime(date.getTime() + EXPIRES);
        const options = { path: "/", expires: date };
        CookieService.set("jwt", action.payload.jwt, options);
        toast({
          title: "Logged in successfully.",
          description: "We've created your account for you.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast({
          title: "Invalid identifier or password.",
          description: "Make sure you have entered your email and password.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  },
});

export const { reducer: loginReducer } = loginSlice;
