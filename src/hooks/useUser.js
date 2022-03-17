import {axiosClient} from 'utils/axios';

export function useUser() {
  const onFetch = async (limit = 10) => {
    console.log('onFetch');
    const {data} = await axiosClient.get(`/user?limit=${limit}`);
    console.log('data', data);
    return data;
  };

  return {
    onFetch,
  };
}
