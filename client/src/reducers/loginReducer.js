import {
  LOGIN_SUCCESSFUL,
  LOG_OUT_SUCCESS } from '../constants/actionTypes';

const initialState = {
  success: false,
  user: {}
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        user: action.data.user
      };
      break;
    case LOG_OUT_SUCCESS:
      state = {
        ...state,
        success: false
      };
      break;
    default:
      return state;
  }
  return state;
};

export default loginReducer;