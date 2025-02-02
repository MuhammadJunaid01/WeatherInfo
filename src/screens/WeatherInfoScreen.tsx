import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import tw from '../../tailwind';
import {ThemedView, WeatherInfo} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {useGetWeatherQuery} from '../services/apis/weatherApiSlice';
import {setWeatherStatus} from '../services/features/weatherSlice';

const WeatherInfoScreen = () => {
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(
    null,
  );

  // Accessing weather data from Redux
  const weatherState = useAppSelector(state => state.weather);
  const {data, error, isLoading, refetch} = useGetWeatherQuery(
    location || {lat: 0, lon: 0},
    {skip: !location},
  );
  console.log('data', data);
  // Get user location on component mount
  useEffect(() => {
    dispatch(setWeatherStatus('loading'));

    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        dispatch(setWeatherStatus('idle'));
      },
      error => {
        console.error('Geolocation error:', error);
        dispatch(setWeatherStatus('failed'));
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatch]);

  return (
    <ThemedView style={tw` flex-1  p-3 `}>
      <WeatherInfo data={data} />
    </ThemedView>
  );
};

export default React.memo(WeatherInfoScreen);
