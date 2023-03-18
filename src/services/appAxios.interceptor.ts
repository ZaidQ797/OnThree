import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import appAxios from './appAxios';
import { GlobalStore } from '../store/index';
import { signout, restore } from '@actions/auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import * as KeychainService from './keychain';

export const configureAxiosInterceoptors = (store: GlobalStore) => {
  appAxios.interceptors.request.use(async config => {
    const token = store.getState().auth.token;
    if (!config.headers) {
      config.headers = {};
    }
    config.headers['authorization'] = `Bearer ${token}`;
    return config;
  });
  const refreshLogic = async (failedRequest: AxiosError) => {
    const { token } = store.getState().auth;
    return axios
      .post(Config.API_URL + '/authentication/refrsh', token, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then(async response => {
        const { Token } = response.data;
        // @ts-ignore
        failedRequest.response.config.headers['authorization'] = Token;
        store.dispatch(restore({ token: Token }));
        await KeychainService.saveCredentials({
          token: Token,
        });
        return Promise.resolve();
      })
      .catch(e => {
        store.dispatch(signout());
      });
  };
  createAuthRefreshInterceptor(appAxios, refreshLogic, {
    statusCodes: [401],
  });
};
