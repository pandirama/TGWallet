import AsyncStorage from '@react-native-async-storage/async-storage';

export const localStorageKey = {
  userInfo: 'userInfo',
  walletInfo: 'walletinfo',
};

export async function setStorage(key: string, value: any) {
  return await AsyncStorage.setItem(key, value);
}

export async function getStorage(key: string) {
  if (key === localStorageKey.walletInfo) {
    const walletInfo = await AsyncStorage.getItem(key);
    return walletInfo != null ? JSON.parse(walletInfo) : null;
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
