import axios from 'axios';
import LogInterceptor from './interceptors/log';
import AccessTokenInterceptor from './interceptors/accessToken';
import UnauthorizeInterceptor from './interceptors/unauthorize';

import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob'

var RNFS = require('react-native-fs');

const BASE_URL = 'https://api.instagram.com/v1/';

const getInstance = (env) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
  });

  instance.interceptors.response.use(
    UnauthorizeInterceptor.onFullfilled,
    UnauthorizeInterceptor.onRejected,
  );

  instance.interceptors.request.use(
    LogInterceptor.requestLog,
    LogInterceptor.requestError,
  );

  instance.interceptors.response.use(
    LogInterceptor.responseLog,
    LogInterceptor.responseError,
  );

  instance.interceptors.request.use(
    AccessTokenInterceptor.addAccessToken,
    AccessTokenInterceptor.onRejected
  );
  return instance;
}

const API = { instance: getInstance() };


API.getFollowers = (accessToken, userId) => {
  return API.instance.get(`/users/self/follows/?access_token=${accessToken}`);
}

API.getUserSelf = (accessToken) => {
  return API.instance.get(`/users/self/?access_token=${accessToken}`)
}

export default API;



