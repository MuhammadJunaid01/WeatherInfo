import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {WeatherAPIResponse} from '../../lib';

interface WeatherState {
  weather: WeatherAPIResponse | null;
  status: string;
}

const initialState: WeatherState = {
  weather: null,
  status: 'idle', // 'loading', 'succeeded', 'failed'
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather(state, action: PayloadAction<WeatherAPIResponse>) {
      state.weather = action.payload;
      state.status = 'succeeded';
    },
    setWeatherStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});

export const {setWeather, setWeatherStatus} = weatherSlice.actions;
export default weatherSlice.reducer;
