import AccessTokenManager from '../../data/AccessTokenManager';
export default AccessTokenInterceptor = {
  addAccessToken: (config) => {
    const accessToken = AccessTokenManager.getAccessToken();
    if (accessToken) {
      const headers = { ...config.headers, 'Authorization': accessToken, 'Content-Type': 'application/json' };
      config.headers = headers;
    }
    return config;
  },

  onRejected: (error) => {
    return Promise.reject(error);
  }
}