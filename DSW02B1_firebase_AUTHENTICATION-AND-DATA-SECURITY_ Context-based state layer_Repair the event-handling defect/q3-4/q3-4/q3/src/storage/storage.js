import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  savedServices: '@ujCampusServices:savedServices',
  theme: '@ujCampusServices:theme',
};

export async function loadJSON(key, fallback) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback; // first launch
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load', key, e);
    return fallback; // corrupt JSON or storage error
  }
}

export async function saveJSON(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('Failed to save', key, e);
  }
}
