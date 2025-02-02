import {showToast, WeatherAPIResponse} from '../../lib';
import {setWeather} from '../features/weatherSlice';
import {RootState} from '../store';
import {apiSlice} from './apiSlice';

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const weatherApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getWeather: builder.query<WeatherAPIResponse, {lat: number; lon: number}>({
      queryFn: async ({lat, lon}, _queryApi, _extraOptions, baseQuery) => {
        const state = _queryApi.getState() as RootState;
        const weatherInfo = state.weather.weather;
        if (!state.network.isConnected) {
          return {
            data: {
              ...weatherInfo,
            },
          };
        }

        try {
          const response = await baseQuery({
            url: `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`,
            method: 'GET',
          });

          if (response.error) {
            showToast(
              typeof response.error === 'string'
                ? response.error
                : 'Unexpected Error!',
            );

            return {error: response.error};
          }

          return {data: response.data as WeatherAPIResponse};
        } catch (error) {
          console.error('Error in queryFn:', error);
          return {error};
        }
      },
      async onQueryStarted({}, {dispatch, queryFulfilled}) {
        try {
          const {data} = await queryFulfilled;
          console.log('DATA', data);
          dispatch(setWeather(data));
        } catch (error: any) {
          showToast(error?.message || 'Unexpected Error!');
        }
      },
    }),
  }),
});

export const {useGetWeatherQuery} = weatherApiSlice;
