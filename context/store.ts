import { configureStore } from "@reduxjs/toolkit";

// reducers 
import asteroidsReducer from "./features/asteroids/asteroidsSlice";
import asteroidReducer from "./features/asteroids/asteroidSlice";

const store = configureStore({
  reducer: {
    asteroids: asteroidsReducer,
    asteroid: asteroidReducer,
  },
});

// Exports ==============================================
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;