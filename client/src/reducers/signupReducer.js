import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL } from '../constants/actionTypes';

const initialState = {
  success: false,
  errors: null
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESSFUL:
      state = {
        ...state,
        success: true,
        errors: null,
      };
      break;
    case SIGNUP_UNSUCCESSFUL:
      state = {
        ...state,
        success: false,
        errors: action.error
      };
      break;
    default:
      return state;
  }
  return state;
};

export default signupReducer;