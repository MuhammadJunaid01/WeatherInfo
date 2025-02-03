import React, {useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import tw from '../../tailwind';
import {Theme, WeatherAPIResponse} from '../lib';
import {ThemedText, WeatherInfoCard} from './shared';
interface IProps {
  data?: WeatherAPIResponse;
  theme?: Theme;
}
const WeatherInfo: React.FC<IProps> = ({data, theme}) => {
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
  const generateBgColor = useMemo(() => {
    switch (theme) {
      case 'light':
        return 'bg-blue-500';
      case 'dark':
        return;
      default:
        break;
    }
  }, [theme]);
  return (
    <View style={tw` flex-1  bg-transparent`}>
      <ScrollView style={tw`flex-1 `}>
        {/* Header Section */}
        <View style={tw`p-6 bg-blue-500 rounded-lg`}>
          {data && (
            <ThemedText size="h2" style={tw``}>
              {data.name}, {data.sys?.country}
            </ThemedText>
          )}
          <ThemedText size="h1" style={tw` mt-2 mb-1`}>
            {kelvinToCelsius(data?.main?.temp)}
          </ThemedText>
          <ThemedText size="h3" style={tw``}>
            {data && data.weather?.[0]?.description?.charAt(0).toUpperCase()}
            {data && data.weather?.[0]?.description?.slice(1)}
          </ThemedText>
        </View>

        {/* Main Weather Info */}
        <View style={tw`p-4`}>
          <View style={tw`flex-row flex-wrap justify-between`}>
            <WeatherInfoCard
              label="Feels Like"
              value={kelvinToCelsius(data?.main?.feels_like)}
            />
            <WeatherInfoCard
              label="Min Temp"
              value={kelvinToCelsius(data?.main?.temp_min)}
            />
            <WeatherInfoCard
              label="Max Temp"
              value={kelvinToCelsius(data?.main?.temp_max)}
            />
          </View>

          {/* Additional Weather Details */}
          <View style={tw`mt-4`}>
            <Text style={tw`text-xl font-semibold mb-2 px-2`}>Details</Text>
            <View style={tw`flex-row flex-wrap justify-between`}>
              <WeatherInfoCard
                label="Humidity"
                value={`${data?.main?.humidity ?? 'N/A'}%`}
              />
              <WeatherInfoCard
                label="Wind Speed"
                value={`${data?.wind?.speed ?? 'N/A'} m/s`}
              />
              <WeatherInfoCard
                label="Pressure"
                value={`${data?.main?.pressure ?? 'N/A'} hPa`}
              />
              <WeatherInfoCard
                label="Visibility"
                value={`${(data?.visibility ?? 0) / 1000} km`}
              />
            </View>
          </View>

          {/* Sun Times */}
          <View style={tw`mt-4`}>
            <Text style={tw`text-xl font-semibold mb-2 px-2`}>Sun Times</Text>
            <View style={tw`flex-row justify-between`}>
              <WeatherInfoCard
                label="Sunrise"
                value={formatTime(data?.sys?.sunrise)}
              />
              <WeatherInfoCard
                label="Sunset"
                value={formatTime(data?.sys?.sunset)}
              />
            </View>
          </View>

          {/* Last Updated */}
          <View style={tw`mt-4 items-center`}>
            <Text style={tw`text-gray-500`}>
              Last Updated:
              {new Date(
                data?.dt ? data.dt * 1000 : Date.now(),
              ).toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(WeatherInfo);
