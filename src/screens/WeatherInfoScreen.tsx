import Geolocation from '@react-native-community/geolocation';
import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect, useMemo, useState} from 'react';
import tw from '../../tailwind';
import {Loader, ThemedText, ThemedView, WeatherInfo} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {useGetWeatherQuery} from '../services/apis/weatherApiSlice';
import {setWeatherStatus} from '../services/features/weatherSlice';

const WeatherInfoScreen = () => {
  const {isConnected} = useNetInfo();
  const {weather} = useAppSelector(state => state.weather);
  const dispatch = useAppDispatch();
  const {theme} = useAppSelector(state => state.theme);
  const {status} = useAppSelector(state => state.weather);
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(
    null,
  );

  // Accessing weather data from Redux
  const {data, isLoading} = useGetWeatherQuery(location || {lat: 0, lon: 0}, {
    skip: !location,
  });
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
  const transformData = useMemo(() => {
    if (!isConnected) {
      return weather;
    }
    return data;
  }, [data, isConnected, weather]);
  if (isLoading || status === 'loading') {
    return (
      <ThemedView style={tw` flex-1 items-center justify-center`}>
        <Loader size={'large'} />
      </ThemedView>
    );
  }
  return (
    <ThemedView style={tw` flex-1  p-3 `}>
      <ThemedText size="h1">
        isConnected:{isConnected ? 'connected' : 'not connected'}
      </ThemedText>
      <WeatherInfo data={transformData} theme={theme} />
    </ThemedView>
  );
};

export default React.memo(WeatherInfoScreen);
