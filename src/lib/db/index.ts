import AsyncStorage from '@react-native-async-storage/async-storage';

// services/cache.ts

/**
 * Cache data in AsyncStorage with a specified key.
 * @param {string} key - The key to store the data under.
 * @param {any} data - The data to be cached.
 */
export const cacheData = async (key: string, data: any): Promise<void> => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (e) {
    console.error('Error caching data:', e);
  }
};

/**
 * Retrieve cached data from AsyncStorage using the specified key.
 * @param {string} key - The key to retrieve the cached data.
 * @returns {Promise<any | null>} - The cached data, or null if not found.
 */
export const getCachedData = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error fetching cached data:', e);
    return null;
  }
};
