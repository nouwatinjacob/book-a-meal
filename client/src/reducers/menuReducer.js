import {
  SET_MENU_SUCCESSFUL, SET_MENU_UNSUCCESSFUL,
  GET_MENU_SUCCESSFUL, GET_MENU_UNSUCCESSFUL
} from '../actions/actionTypes';

const initialState = {
  menu: [],
  menus: [],
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
        error: action.error
      };
    case GET_MENU_SUCCESSFUL:
      return {
        ...state,
        success: true,
        menus: action.data.menus,
        loading: false
      };
    case GET_MENU_UNSUCCESSFUL:
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