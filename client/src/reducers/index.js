import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import mealReducer from './mealReducer';
import menuReducer from './menuReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  loginReducer,
  signupReducer,
  mealReducer,
  menuReducer,
  orderReducer
});