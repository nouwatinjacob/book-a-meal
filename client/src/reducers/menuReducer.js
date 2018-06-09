import {
  SET_MENU_SUCCESSFUL, SET_MENU_UNSUCCESSFUL
} from '../actions/actionTypes';

const initialState = {
  menu: [],
  error: null,
  success: false,
  loading: true,
  passes: null
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENU_SUCCESSFUL:
      return {
        ...state,
        success: true,
        passes: action.data.menu
      };
    case SET_MENU_UNSUCCESSFUL:
      return {
        ...state,
        error: action.error,
      };
    default:
      return {
        ...state
      };
  }
};

export default menuReducer;