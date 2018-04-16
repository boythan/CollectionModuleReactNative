export function refresh(types, timeUnix) {
  // return async (dispatch) => {
  //   return dispatch({
  //     type: 'REFRESH',
  //     data: { types, timeUnix },
  //   })
  // }
  return {
    type: 'REFRESH',
    data: { types, timeUnix },
  }
}