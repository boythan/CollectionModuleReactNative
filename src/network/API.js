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


API.getFollower = (userId, cookie) => {
  API.instance.headers = {
    cookie
  }
  const data = {
    query_hash: '37479f2b8209594dde7facb0d904896a',
    variables: {
      id: userId,
      first: 24,
    }
  }
  return API.instance.get(`https://www.instagram.com/graphql/query/`, { params: data });
}

API.getUserSelf = (accessToken) => {
  return API.instance.get(`/users/self/?access_token=${accessToken}`)
}


API.unFollower = (userID, cookie, token) => {
  API.instance.headers = {
    cookie,
    'x-csrftoken' : token 
  }
  return API.instance.post(`https://www.instagram.com/web/friendships/${userID}/unfollow/`)
}

export default API;



