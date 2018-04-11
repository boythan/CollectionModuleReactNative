import { Actions } from 'react-native-router-flux';
import { AccessTokenManager } from '../../data/AccessTokenManager';

const UnauthorizeStatusCode = 401;
const LoginScene = 'login';

export default UnauthorizeInterceptor = {
  onFullfilled: (response) => {
    return Promise.resolve(response);
  },

  onRejected: (error) => {
    if (error) {
      const config = error.config;
      const response = error.response;
      if (response && Actions.currentScene !== LoginScene && UnauthorizeStatusCode == response.status) {
        //call action logout to clear all data
        // store.dispatch({ type: 'USER_LOGOUT' });
        // Actions.reset(LoginScene);
      }
      return Promise.reject(error);
    }
  }
}