import AsyncStorage from '@react-native-async-storage/async-storage';

export const localStorageKey = {
  userInfo: 'userInfo',
};

export async function setStorage(key: string, value: any) {
  return await AsyncStorage.setItem(key, value);
}

export async function getStorage(key: string) {
  if (key === localStorageKey.userInfo) {
    const userInfo = await AsyncStorage.getItem(key);
    return userInfo != null ? JSON.parse(userInfo) : null;
  }
  return await AsyncStorage.getItem(key);
}

export async function removeStorage(key: string) {
  return await AsyncStorage.removeItem(key);
}

export async function clearStorage() {
  return await AsyncStorage.clear();
}

export const getErrorMessage = (error: any) => {
  return error?.message || error?.data;
};
