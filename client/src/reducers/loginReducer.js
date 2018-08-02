import { 
  LOGIN_SUCCESSFUL,
  LOG_OUT_SUCCESS } from '../constants/actionTypes';

const initialState = {
  success: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        fail: null
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