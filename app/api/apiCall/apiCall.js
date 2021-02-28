import {Methods} from '../';
import axios from 'axios';

export const apiUrl = 'https://api.url/';

const defaultConfig = {
  baseURL: apiUrl,
};

const instance = axios.create(defaultConfig);

export const apiCall = async ({
  endpoint,
  method = Methods.GET,
  headers,
  params,
  data,
}) => {
  headers = {
    ...headers,
  };

  return instance({
    url: endpoint,
    method,
    headers,
    params,
    data,
    timeout: 5000,
  });
};
