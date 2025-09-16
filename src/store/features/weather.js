import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from "axios";
export const getLanLon = createAsyncThunk('weather/getLanLon',
async (city, thunkAPI)=>{
  const {getState, dispatch, rejectWithValue} = thunkAPI
  const {key} = getState().weather
  try {
  const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`)
  const cityInfo = response.data[0]
  dispatch(getWeather(cityInfo))
  }
  catch (error){
    return rejectWithValue(error)

  }
})
const getWeather = createAsyncThunk('weather/getWeather',
async (cityInfo, thunkAPI)=>{
  const {getState, rejectWithValue} = thunkAPI
  try{
    const {key} = getState().weather
    const {local_names, lat, lon} = cityInfo
    const response = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&lang=ru&appid=${key}`)
    const weatherObj = {...response.data, name:local_names.ru}
    return weatherObj

  }
  catch(error){
    return rejectWithValue(error)
  }
}
)
const initialState = {
  key: '53d6d8635f127508344eebf3196c9ff3',
  weather: null,
  isError: null,

}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(getLanLon.pending, (state) => {
      state.isError = false
    })
    builder.addCase(getLanLon.rejected, (state, action) => {
      state.isError = action.payload.message
    } )
    builder.addCase(getLanLon.fulfilled, (state) => {
      state.isError = false
    } )
    builder.addCase(getWeather.pending, (state) => {
      state.isError = false
    } )
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.weather = action.payload
    } )
    builder.addCase(getWeather.rejected, (state, action) => {
      state.isError = action.payload.message
    } )
  }
})

export default weatherSlice.reducer