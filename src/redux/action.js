

export function doLogin(account) {
  // return async (dispatch) => {
  //   return dispatch({
  //     type: 'ACCOUNT',
  //     data:  account ,
  //   })
  // }
  return {
    type: 'ACCOUNT',
    data: account,
  }
}