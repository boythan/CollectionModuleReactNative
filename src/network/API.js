import axios from 'axios';



import LogInterceptor from './interceptors/log';
import AccessTokenInterceptor from './interceptors/accessToken';
import UnauthorizeInterceptor from './interceptors/unauthorize';

import _ from 'lodash';

const getInstance = (env) => {
  const instance = axios.create({
    baseURL: 'http://139.59.218.140:3000',
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

API.getUsers = () => {
  return API.instance.get('/users?since=135');
}

API.login = (username, password) => {
  const params = {
    username,
    password
  }
  return API.instance.post('/api/Users/login', params);
}

API.getProducts = () => {
  return API.instance.get('/api/Products')
}
export default API;