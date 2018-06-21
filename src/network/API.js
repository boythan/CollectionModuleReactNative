import axios from 'axios';
import LogInterceptor from './interceptors/log';
import AccessTokenInterceptor from './interceptors/accessToken';
import UnauthorizeInterceptor from './interceptors/unauthorize';

import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob'

var RNFS = require('react-native-fs');

// const BASE_URL = 'https://api.github.com/';
const BASE_URL = 'http://149.28.131.178/';

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

API.getUsers = () => {
  return API.instance.get('/users?since=135');
}

API.login = (email, password) => {
  const params = {
    email,
    password
  }
  return API.instance.post('/api/customers/login', params);
}

API.getProducts = (pagingData, collectionID = 1300077) => {
  const data = {
    page: pagingData.pageIndex,
    limit: pagingData.pageSize,
    collection_id: collectionID
  }
  return API.instance.get(`/api/products`, { params: data })
}

API.uploadImage = (file) => {
  return getBase64(file.uri).then(data => {
    return RNFetchBlob.fetch('POST', BASE_URL + '/api/Containers/warehouse/upload', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [{ name: 'avatar', filename: getFileName(file.uri), data: data }]);
  })
}

export default API;

async function getBase64(uri) {
  const filePath = RNFS.MainBundlePath + uri;
  return await RNFS.readFile(uri, 'base64')
}

getFileName = (path) => {
  if (!path) return '';
  const startIndex = (path.indexOf('\\') >= 0 ? path.lastIndexOf('\\') : path.lastIndexOf('/'));
  let filename = path.substring(startIndex);
  if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
    filename = filename.substring(1);
  }
  return filename;
}



