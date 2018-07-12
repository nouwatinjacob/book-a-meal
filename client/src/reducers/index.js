import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import mealReducer from './mealReducer';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';
import { CLEAR_STATE } from '../actions/actionTypes';

const appReducer = combineReducers({
  loginReducer,
  signupReducer,
  mealReducer,
  menuReducer,
  orderReducer
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STATE) {
    state = appReducer({}, {});
  }
  return appReducer(state, action);
};

export default rootReducer;