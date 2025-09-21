import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const key = import.meta.env.VITE_OPENWEATHER_API_KEY;


export const getLanLon = createAsyncThunk('weather/getLanLon',
  async (city, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
      const cityInfo = response.data[0]
      dispatch(getWeather(cityInfo))
    }
    catch (error) {
      return rejectWithValue(error)

    }
  })
const getWeather = createAsyncThunk('weather/getWeather',
  async (cityInfo, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { local_names, lat, lon } = cityInfo
      const response = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=metric&lang=ru&appid=${key}`)
      const weatherObj = { ...response.data, name: local_names.ru }
      return weatherObj

    }
    catch (error) {
      return rejectWithValue(error)
    }
  }
)
const initialState = {
  weather: null,
  isError: null,

}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanLon.pending, (state) => {
      state.isError = false
    })
    builder.addCase(getLanLon.rejected, (state, action) => {
      state.isError = action.payload.message
    })
    builder.addCase(getLanLon.fulfilled, (state) => {
      state.isError = false
    })
    builder.addCase(getWeather.pending, (state) => {
      state.isError = false
    })
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.weather = action.payload
      console.log(state.weather);
    })
    builder.addCase(getWeather.rejected, (state, action) => {
      state.isError = action.payload.message
    })
  }
})

export default weatherSlice.reducer