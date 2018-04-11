
// Set initial state
const initialState = {};

export default function accountUser(state = initialState, action) {
  switch (action.type) {
    case 'ACCOUNT':
      return {
        ...state,
        account: action.data,
      }
    default:
      return state;
  }
}