import {axiosClient} from 'utils/axios';
import AsyncStorage from '@react-native-community/async-storage';

export function useUser() {
  const onFetch = async (page = 0) => {
    try {
      const {data} = await axiosClient.get(`/user?page=${page}&limit=10`);
      return data;
    } catch (error) {
      return [];
    }
  };

  const onFilter = async param => {
    try {
      let data = await AsyncStorage.getItem(param);
      if (data) {
        data = Object.values(JSON.parse(data));
      }
      return data;
    } catch (error) {
      return [];
    }
  };

  return {
    onFetch,
    onFilter,
  };
}
