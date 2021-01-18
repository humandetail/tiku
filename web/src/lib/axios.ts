/*
 * @FilePath: /tiku/web/src/lib/axios.ts
 * @Description: axios封装
 * @Author: humandetail
 * @Date: 2021-01-05 20:45:20
 * @LastEditors: humandetail
 * @LastEditTime: 2021-01-06 17:49:11
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance: AxiosInstance = axios.create({
  timeout: 5000
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
});

instance.interceptors.response.use((response: AxiosResponse) => {
  const {
    status,
    data
  } = response;

  if (status < 200 || status >= 300 || data.errCode !== 0) {
    return Promise.reject(new Error('Request failed.'));
  }

  return data.data;
}, (error: any) => {
  return Promise.reject(new Error('Request failed.' + error));
});

// instance.all = axios.all;
// instance.spread = axios.spread;

export default instance;
