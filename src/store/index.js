import { configureStore } from '@reduxjs/toolkit'
import weather from "./features/weather.js";
export const store = configureStore({
  reducer: {
    weather,
  },
})