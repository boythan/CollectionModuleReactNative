import AccessTokenManager from '../../data/AccessTokenManager';
export default AccessTokenInterceptor = {
  addAccessToken: (config) => {
    const accessToken = AccessTokenManager.getAccessToken();
    if (accessToken) {
      const headers = { ...config.headers, 'X-Auth-Token': accessToken };
      config.headers = headers;
    }
    return config;
  },

  onRejected: (error) => {
    return Promise.reject(error);
  }
}