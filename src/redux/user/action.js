import AccessTokenManager from '../../data/AccessTokenManager'
import API from '@network/API'
export function doLogin(userName, password) {
  return async (dispatch) => {
    // Should accept user login without deviceId or deviceToken
    return API.login(userName, password)
      .then((res) => {
        if (res.data && res.data.error) {
          return Promise.reject(res.data);
        } else {
          return this.loginSuccessAction(res, dispatch);
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
}

loginSuccessAction = (res, dispatch) => {
  // need to store accessToken to AsyncStorage
  const account = res.data;
  AccessTokenManager.saveAccessToken(account.token);

  // Send to Redux
  return dispatch({
    type: 'USER_LOGIN',
    data: account,
  });

}