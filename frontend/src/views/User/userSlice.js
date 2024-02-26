// usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { fetchDataFromAPI } from "../../apiController"; // Assume you have an API function to fetch data

// Async thunk to fetch data
export const usersSlice = createAsyncThunk("data/fetchData", async () => {
  const response = await fetchDataFromAPI();
  return response.data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
