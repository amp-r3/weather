import { configureStore } from '@reduxjs/toolkit'
import weather from "./features/weather.js";
import  IPGeo  from './features/IPGeo.js';
export const store = configureStore({
  reducer: {
    weather,
    IPGeo,
  },
})