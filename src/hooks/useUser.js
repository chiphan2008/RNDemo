import {axiosClient} from 'utils/axios';

export function useUser() {
  const onFetch = async (page = 0) => {
    try {
      const {data} = await axiosClient.get(`/user?page=${page}&limit=10`);
      return data;
    } catch (error) {
      return [];
    }
  };

  return {
    onFetch,
  };
}
