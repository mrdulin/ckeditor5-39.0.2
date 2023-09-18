import axios, { AxiosRequestConfig } from 'axios';
import md5 from 'blueimp-md5';
import Cookies from 'js-cookie';
import cloneDeep from 'lodash.clonedeep';
import qs from 'qs';

export interface ApiResponse<T = unknown> {
  code: number | string;
  message: string;
  data: T;
}

const defaultParamsSerializer = (params: any) => {
  return qs.stringify(params, { arrayFormat: 'repeat' });
};

const makeRequestConfig = (config: AxiosRequestConfig) => {
  let deviceId = Cookies.get('device_id');

  if (!deviceId) {
    deviceId = md5(Math.random().toString());
    Cookies.set('device_id', deviceId, { domain: '.innodealing.com' });
  }

  const cloneConfig = cloneDeep(config);
  if (typeof cloneConfig.params !== 'undefined') {
    if (typeof cloneConfig.params === 'object') {
      cloneConfig.paramsSerializer = cloneConfig.paramsSerializer ?? defaultParamsSerializer;

      let paramsString = '';
      cloneConfig.params.timestamp = new Date().getTime().toString();
      Object.keys(cloneConfig.params)
        .sort()
        .forEach((key) => {
          const value = cloneConfig.params[key];
          if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
            paramsString += value;
          } else if (value instanceof Array) {
            paramsString += value.join('');
          }
        });
      cloneConfig.params.sign = md5(paramsString + deviceId);
    }
  } else {
    cloneConfig.params = {};
    cloneConfig.params.timestamp = new Date().getTime().toString();
    cloneConfig.params.sign = md5(cloneConfig.params.timestamp + deviceId);
  }
  return cloneConfig;
};

export function api<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  return axios(makeRequestConfig(config));
}
