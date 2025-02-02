import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the initial state structure
interface WeatherState {
  forecast: any; // Weather forecast data
  loading: boolean; // Loading state
  error: string | null; // Error state
}

const initialState: WeatherState = {
  forecast: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<any>) => {
      state.forecast = action.payload;
    },
    setWeatherLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWeatherError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {setWeather, setWeatherLoading, setWeatherError} =
  weatherSlice.actions;

export default weatherSlice.reducer;
