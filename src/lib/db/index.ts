import MMKVStorage from 'react-native-mmkv-storage';

/* This code snippet is exporting a constant named `storage` that is initialized with a new instance of
`MMKVStorage.Loader().initialize()`. */
export const storage = new MMKVStorage.Loader().initialize();
// services/cache.ts

export const cacheData = async (key: string, data: any) => {
  try {
    await storage.setStringAsync(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error caching data:', e);
  }
};

export const getCachedData = async (key: string) => {
  try {
    const value = await storage.getStringAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Error fetching cached data:', e);
    return null;
  }
};
