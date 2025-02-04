import React, {useMemo} from 'react';
import {ScrollView, View} from 'react-native';
import tw from '../../tailwind';
import {COLORS, screenWidth} from '../config/constants';
import {Theme, WeatherAPIResponse} from '../lib';
import {ThemedText, WeatherInfoCard} from './shared';
interface IProps {
  data?: WeatherAPIResponse | null;
  theme?: Theme;
}
const WeatherInfo: React.FC<IProps> = ({data, theme}) => {
  const isDarkMode = useMemo(() => theme === 'dark', [theme]);

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
    <View style={tw` flex-1  bg-transparent`}>
      <ScrollView contentContainerStyle={tw` flex-grow`}>
        {/* Header Section */}
        <View
          style={tw`p-6  ${
            isDarkMode ? ` border border-[${COLORS.primary}]` : 'bg-blue-500'
          } rounded-lg`}>
          {data && (
            <ThemedText size="h2" style={tw`${isDarkMode ? '' : 'text-white'}`}>
              {data.name}, {data.sys?.country}
            </ThemedText>
          )}
          <ThemedText
            size="h1"
            style={tw` mt-0 mb-1 ${isDarkMode ? '' : 'text-white'}`}>
            {kelvinToCelsius(data?.main?.temp)}
          </ThemedText>
          <ThemedText size="h3" style={tw`${isDarkMode ? '' : 'text-white'}`}>
            {data && data.weather?.[0]?.description?.charAt(0).toUpperCase()}
            {data && data.weather?.[0]?.description?.slice(1)}
          </ThemedText>
        </View>

        {/* Main Weather Info */}
        <View style={tw`p-4`}>
          <View style={tw`flex-row flex-wrap justify-start`}>
            <View style={tw` flex-1 `}>
              <WeatherInfoCard
                isDarkMode={isDarkMode}
                label="Feels Like"
                value={kelvinToCelsius(data?.main?.feels_like)}
              />
            </View>
            <View style={tw` flex-1`}>
              <WeatherInfoCard
                isDarkMode={isDarkMode}
                label="Min Temp"
                value={kelvinToCelsius(data?.main?.temp_min)}
              />
            </View>
            <View style={tw` flex-1`}>
              <WeatherInfoCard
                isDarkMode={isDarkMode}
                label="Max Temp"
                value={kelvinToCelsius(data?.main?.temp_max)}
              />
            </View>
          </View>

          {/* Additional Weather Details */}
          <View style={tw`mt-4`}>
            <ThemedText size="h3" style={tw` mb-1 px-2`}>
              Details
            </ThemedText>
            <View style={tw`flex-row flex-wrap justify-start`}>
              <View style={tw` w-[${screenWidth * 0.28}px]`}>
                <WeatherInfoCard
                  isDarkMode={isDarkMode}
                  label="Humidity"
                  value={`${data?.main?.humidity ?? 'N/A'}%`}
                />
              </View>
              <View style={tw` w-[${screenWidth * 0.28}px]`}>
                <WeatherInfoCard
                  isDarkMode={isDarkMode}
                  label="Wind Speed"
                  value={`${data?.wind?.speed ?? 'N/A'} m/s`}
                />
              </View>

              <View style={tw` w-[${screenWidth * 0.28}px]`}>
                <WeatherInfoCard
                  isDarkMode={isDarkMode}
                  label="Pressure"
                  value={`${data?.main?.pressure ?? 'N/A'} hPa`}
                />
              </View>

              <View style={tw` w-[${screenWidth * 0.28}px]`}>
                <WeatherInfoCard
                  isDarkMode={isDarkMode}
                  label="Visibility"
                  value={`${(data?.visibility ?? 0) / 1000} km`}
                />
              </View>
            </View>
          </View>

          {/* Sun Times */}
          <View style={tw`mt-1`}>
            <ThemedText size="h3" style={tw` mb-2 px-2`}>
              Sun Times
            </ThemedText>
            <View style={tw`flex-row justify-start`}>
              <WeatherInfoCard
                isDarkMode={isDarkMode}
                label="Sunrise"
                value={formatTime(data?.sys?.sunrise)}
              />
              <WeatherInfoCard
                isDarkMode={isDarkMode}
                label="Sunset"
                value={formatTime(data?.sys?.sunset)}
              />
            </View>
          </View>

          {/* Last Updated */}
          <View style={tw`mt-4 items-center`}>
            <ThemedText size="h4" style={tw``}>
              Last Updated:
              {new Date(
                data?.dt ? data.dt * 1000 : Date.now(),
              ).toLocaleString()}
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(WeatherInfo);
