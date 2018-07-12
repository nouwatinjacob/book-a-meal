import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL } from '../actions/actionTypes';

const initialState = {
  success: false,
  fail: null,
  errors: null
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
        fails: null
      };
      break;
    case SIGNUP_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        fails: action.payload
      };
      break;
    default:
      return state;
  }
  return state;
};

export default signupReducer;