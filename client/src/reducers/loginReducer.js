import { LOGIN_SUCCESSFUL, LOGIN_UNSUCCESSFUL, LOG_OUT_SUCCESS } from '../actions/actionTypes';

const initialState = {
  success: false,
  fail: null
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
    case LOGIN_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fail: action.payload
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