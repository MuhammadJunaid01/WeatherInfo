import Geolocation from '@react-native-community/geolocation';
import {useNetInfo} from '@react-native-community/netinfo';
import React, {useEffect, useMemo, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
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

  // Request location permissions on Android
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true; // iOS handles permissions in Info.plist
  };

  useEffect(() => {
    const fetchLocation = async () => {
      if (isConnected) {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          console.error('Location permission denied');
          dispatch(setWeatherStatus('failed'));
          return;
        }

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
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 10000,
          },
        );
      }
    };

    fetchLocation();
  }, [dispatch, isConnected]);

  const {data, isLoading} = useGetWeatherQuery(location || {lat: 0, lon: 0}, {
    skip: !location,
  });

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
      {/* <ThemedText size="h1">
        isConnected: {isConnected ? 'connected' : 'not connected'}
      </ThemedText> */}
      <WeatherInfo data={transformData} theme={theme} />
    </ThemedView>
  );
};

export default React.memo(WeatherInfoScreen);
