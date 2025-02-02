import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';

import tw from 'twrnc';
import {useAppDispatch, useAppSelector} from '../hooks/useReduxHooks';
import {useGetWeatherQuery} from '../services/apis/weatherApiSlice';
import {setWeatherStatus} from '../services/features/weatherSlice';

const WeatherInfo = () => {
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
  const kelvinToCelsius = (kelvin?: number) => {
    if (!kelvin) {
      return 'N/A';
    }
    return `${(kelvin - 273.15).toFixed(1)}°C`;
  };

  const formatTime = (timestamp?: number) => {
    if (!timestamp) {
      return 'N/A';
    }
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };
  return (
    <View style={tw`flex-1 justify-center items-center p-4`}>
      {isLoading && <Text style={tw`text-lg`}>Loading...</Text>}
      {error && (
        <Text style={tw`text-red-500`}>
          Error: Unable to fetch weather data
        </Text>
      )}

      <Button title="Refresh" onPress={refetch} />
    </View>
  );
};

export default React.memo(WeatherInfo);
