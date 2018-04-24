const DEBUG = __DEV__;
export default LogInterceptor = {
  requestLog:  (config) => {
    if (DEBUG) {
      console.log(`>>> ${config.method}: ${config.url}`);
      console.log(config.data);
      console.log(config.headers);
    }
    return config;
  },

  requestError : (error) => {
    if (DEBUG) {
      console.log(error);
    }
    return Promise.reject(error);
  },

  responseLog : (response) => {
    if (DEBUG) {
      const config = response.config;
      console.log(`<<< ${response.status} ${config.method}: ${config.url}`);
      console.log(response);
    }
    return response;
  },

  responseError: (error) => {
    if (DEBUG) {
      const config = error.config;
      const response = error.response;
      if (response) {
        // console.log(`<<< ${response.status} ${config.method}: ${config.url}`);
        console.log(response);
      } else {
        // console.log(`<<< ${config.method}: ${config.url}`);
        console.log('network log error', error);
      }
    }
    return Promise.reject(error);
  }

}