import axios from 'axios';
import {NetworkInfo} from 'react-native-network-info';
import config from '../config';
import {getMainApi} from '../features/Auth/redux/getters';
import {store} from '../redux/store';

const client = axios.create({
  baseURL: config.baseURL,
  headers: {
    ip: null,
    origin: 'yogyagroup.com',
    source: 'sails-api',
    'Content-Type': 'multipart/form-data',
    Authorization: null,
  },
});

client.interceptors.request.use(
  async (axiosOriginalConfig) => {
    const {token} = store.getState().auth;
    const mainApi = getMainApi(store.getState()) || config.baseURL;

    axiosOriginalConfig.baseURL = mainApi;

    if (token) {
      axiosOriginalConfig.headers.Authorization = `Bearer ${token}`;
    }

    const ipAddress = await NetworkInfo.getIPAddress();
    axiosOriginalConfig.headers.ip = ipAddress;

    return axiosOriginalConfig;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const axiosClient = client;
export const axiosIntance = axios;
