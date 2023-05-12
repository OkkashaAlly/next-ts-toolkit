import { configureStore } from "@reduxjs/toolkit";

// reducers 
import asteroidsReducer from "./features/asteroids/asteroidsSlice";

const store = configureStore({
  reducer: {
    asteroids: asteroidsReducer,
  },
});

// Exports ==============================================
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;