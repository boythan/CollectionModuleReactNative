import { combineReducers } from 'redux';

import userAccount from './user/reducer';

// Combine all
const appReducer = combineReducers({
  userAccount,
});

// Setup root reducer
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;