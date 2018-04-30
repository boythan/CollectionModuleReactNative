import axios from 'axios';



import LogInterceptor from './interceptors/log';
import AccessTokenInterceptor from './interceptors/accessToken';
import UnauthorizeInterceptor from './interceptors/unauthorize';

import _ from 'lodash';
import RNFetchBlob from 'react-native-fetch-blob'

var RNFS = require('react-native-fs');

const BASE_URL = 'http://159.89.209.249:3000/';
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

API.createProduct = (product) => {
  return API.instance.post(`/api/Products`, product)
}

API.updateProduct = (product) => {
  return API.instance.put(`/api/Products/${product.id}`, product)
}

API.deleteProduct = (productId) => {
  return API.instance.delete(`/api/Products/${productId}`)
}

API.getOrders = () => {
  return API.instance.get('/api/Orders')
}

API.createOrder = (order) => {
  return API.instance.post(`/api/Orders`, order)
}

API.updateOrder = (order) => {
  return API.instance.put(`/api/Orders`, order)
}

API.deleteOrder = (orderId) => {
  return API.instance.delete(`/api/Orders/${orderId}`)
}

API.getProductImages = (productId) => {
  return API.instance.get(`/api/Products/${productId}/images`)
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



