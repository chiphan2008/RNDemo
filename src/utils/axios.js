import axios from 'axios';
import {HOST, APP_ID} from 'utils/constants';

const config = {
  baseURL: HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'app-id': APP_ID,
  },
};

export const axiosClient = axios.create(config);
