import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  loading: boolean;
  asteroid: any | undefined;
  error: string | undefined;
};

// Initial state ===================
const initialState: InitialState = {
  loading: false,
  asteroid: undefined,
  error: undefined,
};

// Actions ===========================
export const fetchAsteroid = createAsyncThunk(
  "asteroid/fetchAsteroid",
  async (id: string) => {
    // CONSTANTS
    const API_URL = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=DEMO_KEY`;

    try {
      const response = await axios.get(API_URL);
      const { data } = response;
      console.log("data: ", data);

      return data;
    } catch (error: any) {
      console.log("Error: ", error);
      throw error.response.data;
    }
  }
);

// Slice ============================
export const asteroidSlice = createSlice({
  name: "asteroid",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsteroid.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchAsteroid.fulfilled, (state, action) => {
      state.loading = false;
      state.asteroid = action.payload;
      state.error = undefined;
    });
    builder.addCase(fetchAsteroid.rejected, (state, action) => {
      state.loading = false;
      state.asteroid = undefined;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

// Exports ======================
export default asteroidSlice.reducer;
