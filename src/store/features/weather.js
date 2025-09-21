import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "axios";

const weatherKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
const geoKey = import.meta.env.VITE_GEOAPIFY_KEY


export const getLanLon = createAsyncThunk('weather/getLanLon',
  async (city, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${weatherKey}`);

      if (!response.data || response.data.length === 0) {
        return rejectWithValue('Город не найден. Проверьте правильность написания.');
      }

      const cityInfo = response.data[0];
      console.log(cityInfo);
      dispatch(getWeather(cityInfo));

    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getWeatherByCoords = createAsyncThunk(
  'weather/getWeatherByCoords',
  async ({ lat, lon }, { rejectWithValue }) => {
    try {
      const getCity = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=ru&apiKey=${geoKey}`);
      const getWeather = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=metric&lang=ru&appid=${weatherKey}`)
      const props = getCity.data?.features?.[0]?.properties || {};
      const cityName =  props.city || props.town || props.village || props.locality || props.county || props.state || props.formatted || null;
      const weatherObj = { ...getWeather.data, name: cityName }
      return weatherObj
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)


const getWeather = createAsyncThunk('weather/getWeather',
  async (cityInfo, thunkAPI) => {
    const { rejectWithValue } = thunkAPI
    try {
      const { local_names, lat, lon } = cityInfo
      const response = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=metric&lang=ru&appid=${weatherKey}`)
      const weatherObj = { ...response.data, name: local_names.ru }
      return weatherObj

    }
    catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
const initialState = {
  weather: null,
  isLoading: false,
  isError: null,

}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // оброботчик для getLanLon
    builder.addCase(getLanLon.pending, (state) => {
      state.isError = false
    })
    builder.addCase(getLanLon.rejected, (state, action) => {
      state.isError = action.payload
    })
    builder.addCase(getLanLon.fulfilled, (state) => {
      state.isError = false
    })
    // оброботчик для getWeather
    builder.addCase(getWeather.pending, (state) => {
      state.isError = false
      state.isLoading = true
    })
    builder.addCase(getWeather.fulfilled, (state, action) => {
      state.weather = action.payload
      state.isLoading = false
    })
    builder.addCase(getWeather.rejected, (state, action) => {
      state.isError = action.payload
      state.isLoading = false
    })
    // оброботчик для getWeatherByCoords
    builder.addCase(getWeatherByCoords.pending, (state) => {
      state.isError = false
      state.isLoading = true
    })
    builder.addCase(getWeatherByCoords.fulfilled, (state, action) => {
      state.weather = action.payload
      state.isLoading = false
    })
    builder.addCase(getWeatherByCoords.rejected, (state, action) => {
      state.isError = action.payload
      state.isLoading = false
    })
  }
})

export default weatherSlice.reducer