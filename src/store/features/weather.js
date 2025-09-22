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
  async ({ lat, lon }, { getState, rejectWithValue }) => {

    const cacheKey = `${lat.toFixed(4)}:${lon.toFixed(4)}`

    const cachedData = getState().weather.cache[cacheKey]
    if (cachedData) {
      return cachedData
    }

    try {
      const getCity = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=ru&apiKey=${geoKey}`);
      const getWeather = await axios.get(`https://api.openweathermap.org/data/2.8/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=metric&lang=ru&appid=${weatherKey}`)
      const props = getCity.data?.features?.[0]?.properties || {};
      const cityName = props.city || props.town || props.village || props.locality || props.county || props.state || props.formatted || null;
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

const loadCacheFromStorage = () => {
  try {
    const serializedCache = localStorage.getItem('weatherCache');
    if (serializedCache === null) {
      return {};
    }
    return JSON.parse(serializedCache);
  } catch (error) {
    console.warn('Невозможно загрузить кеш из локального хранилища', error);
    return {}
  }
}
const initialState = {
  weather: null,
  isLoading: false,
  isError: null,
  cache: loadCacheFromStorage(),
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
      })
      .addCase(getWeatherByCoords.fulfilled, (state, action) => {
        const { lat, lon } = action.meta.arg;
        const cacheKey = `${lat.toFixed(4)}:${lon.toFixed(4)}`;

        state.weather = action.payload;
        state.cache[cacheKey] = action.payload;

        try {
          const serializedCache = JSON.stringify(state.cache);
          localStorage.setItem('weatherCache', serializedCache);
        } catch (error) {
          console.warn('Невозможно сохранить кеш в локальное хранилище', error);
        }
      })

      // Общие обработчики для всех thunk'ов
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.isLoading = true;
          state.isError = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload || action.error.message;
        }
      );
  }
})

export default weatherSlice.reducer