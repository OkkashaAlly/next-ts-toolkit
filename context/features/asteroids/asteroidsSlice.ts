import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type InitialState = {
  loading: boolean;
  asteroids: any[] | undefined;
  error: string | undefined;
};

// Initial state ===================
const initialState: InitialState = {
  loading: false,
  asteroids: [],
  error: undefined,
};

// Actions ===========================
export const fetchAsteroids = createAsyncThunk(
  "asteroids/fetchAsteroids",
  async (inputs: { startDate: string; endDate: string }) => {
    // CONSTANTS
    const API_URL = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${inputs.startDate}&end_date=${inputs.endDate}&api_key=DEMO_KEY`;

    try {
      const response = await axios.get(API_URL);
      const { data } = response;
      const asteroids = [
        ...data.near_earth_objects[inputs.startDate],
        ...data.near_earth_objects[inputs.endDate],
      ];
      console.log("asteroids: ", asteroids);
      return asteroids;
    } catch (error: any) {
      console.log("Error: ", error);
      throw error.response.data;
    }
  }
);

// Slice ============================
export const asteroidsSlice = createSlice({
  name: "asteroids",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAsteroids.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchAsteroids.fulfilled,
      (state, action) => {
        state.loading = false;
        state.asteroids = action.payload;
        state.error = undefined;
      }
    );
    builder.addCase(fetchAsteroids.rejected, (state, action) => {
      state.loading = false;
      state.asteroids = undefined;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

// Exports ======================
export default asteroidsSlice.reducer;
