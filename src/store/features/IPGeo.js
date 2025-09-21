import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getLocation = createAsyncThunk(
  'IPGeo/getLocation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios('http://ip-api.com/json/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Сетевая ошибка при определении местоположения')
    }
  }
)

export const getLocationByBrowser = createAsyncThunk(
  'IPGeo/getLocationByBrowser',
  async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('Ваш браузер не поддерживает геолокацию');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject('Вы запретили доступ к местоположению');
              break;
            case error.POSITION_UNAVAILABLE:
              reject('Информация о местоположении недоступна');
              break;
            case error.TIMEOUT:
              reject('Время запроса местоположения истекло');
              break;
            default:
              reject('Произошла неизвестная ошибка');
              break;
          }
        }
      );
    });
  }
);



const initialState = {
  location: {
    city: null,
    lat: null,
    lon: null,
    loading: false,
    error: null
  },

}

export const IPGeo = createSlice({
  name: 'IPGeo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // оброботчики для getLocation
    builder.addCase(getLocation.pending, (state) => {
      state.location.loading = true
      state.location.error = null
    })
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.location.loading = false
      state.location.city = action.payload.city
      state.location.lat = action.payload.lat
      state.location.lon = action.payload.lon
    })
    builder.addCase(getLocation.rejected, (state, action) => {
      state.location.loading = false
      state.location.error = action.payload
    })
    // оброботчики для getLocationByBrowser
    builder.addCase(getLocationByBrowser.pending, (state) => {
      state.location.loading = true
      state.location.error = null
    })
    builder.addCase(getLocationByBrowser.fulfilled, (state, action) => {
      state.location.loading = false
      state.location.lat = action.payload.lat
      state.location.lon = action.payload.lon
    })
    builder.addCase(getLocationByBrowser.rejected, (state, action) => {
      state.location.loading = false
      state.location.error = action.payload
    })
  }
})

export default IPGeo.reducer