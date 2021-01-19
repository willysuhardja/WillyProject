import axios from 'axios';
import config from '../config';
import {store} from '../redux/store';

const client = axios.create({
  baseURL: config.baseURL,
});

client.interceptors.request.use(
  async (axiosOriginalConfig) => {
    const {token} = store.getState().auth;

    if (token) {
      axiosOriginalConfig.headers.Authorization = `Bearer ${token}`;
    }

    return axiosOriginalConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const axiosClient = client;
