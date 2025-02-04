import {showToast, WeatherAPIResponse} from '../../lib';
import {setWeather} from '../features/weatherSlice';
import {apiSlice} from './apiSlice';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weatherApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWeather: builder.query<WeatherAPIResponse, {lat: number; lon: number}>({
      query: ({lat, lon}) => ({
        url: `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
        method: 'GET',
      }),
      async onQueryStarted({}, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setWeather(data));
        } catch (error: any) {
          showToast(error?.message || 'Unexpected Error!');
        }
      },
    }),
  }),
});

export const {useGetWeatherQuery} = weatherApiSlice;
