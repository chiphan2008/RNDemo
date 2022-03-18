import AsyncStorage from '@react-native-community/async-storage';

export const getAgeFromUri = uri => {
  try {
    const nameImg = uri.split('/').reverse()[0];
    return nameImg.split('.')[0] || null;
  } catch (error) {
    return null;
  }
};

export const setItem = async (key, data) => {
  console.log('data', data);
  return await AsyncStorage.setItem(key, JSON.stringify(data));
};
