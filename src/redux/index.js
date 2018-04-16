import { combineReducers } from 'redux';

import userAccount from './user/reducer';
import refresh from './refresh/reducer';

// Combine all
const appReducer = combineReducers({
  userAccount,
  refresh,
});

// Setup root reducer
const rootReducer = (state, action) => {
  return appReducer(state, action);
};
export default rootReducer;