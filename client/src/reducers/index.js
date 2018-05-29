import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import signupReducer from './signupReducer';
import mealReducer from './mealReducer';

export default combineReducers({
  loginReducer,
  signupReducer,
  mealReducer
});