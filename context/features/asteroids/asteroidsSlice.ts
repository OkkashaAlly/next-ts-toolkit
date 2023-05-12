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
export const fetchAsteroids = createAsyncThunk("job/fetchAsteroids", async () => {
  try {
  const response = await axios.get("/api/job/all");
  const { data } = await response.data;
  return data;
  }catch (error: any) {
    console.log("Error: ", error);
    throw error.response.data;

  }
});

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
      (state, action: PayloadAction<any[]>) => {
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
