import {
  MAKE_ORDER_SUCCESSFUL, MAKE_ORDER_UNSUCCESSFUL,
  GET_USER_ORDER_SUCCESSFUL, GET_USER_ORDER_UNSUCCESSFUL,
  GET_AN_ORDER_SUCCESSFUL, GET_AN_ORDER_UNSUCCESSFUL,
  MODIFY_ORDER_SUCCESSFUL, MODIFY_ORDER_UNSUCCESSFUL,
  GET_ALL_CATERER_ORDER_SUCCESSFUL, GET_ALL_CATERER_ORDER_UNSUCCESSFUL,
  CANCEL_ORDER_SUCCESSFUL, CANCEL_ORDER_UNSUCCESSFUL
} from '../constants/actionTypes';

const initialState = {
  error: null,
  success: false,
  loading: true,
  order: [],
  orders: [],
  orderDetails: [],
  passes: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_SUCCESSFUL:
      return {
        ...state,
        order: action.data,
        success: true,
        loading: false
      };
    case MAKE_ORDER_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        error: action.error.response.data
      };
    case GET_USER_ORDER_SUCCESSFUL:
      return {
        ...state,
        orders: action.data.orders,
        success: true,
        loading: false,
      };
    case GET_USER_ORDER_UNSUCCESSFUL:
      return {
        ...state,
        error: action.error
      };
    case GET_AN_ORDER_SUCCESSFUL:
      return {
        ...state,
        order: action.data,
        loading: false,
        success: true,
      };
    case GET_AN_ORDER_UNSUCCESSFUL:
      return {
        ...state,
        error: action.error
      };
    case MODIFY_ORDER_SUCCESSFUL:
      return {
        ...state,
        modifiedOrder: action.data,
        success: true
      };
    case MODIFY_ORDER_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        error: action.error.response.data
      };
    case GET_ALL_CATERER_ORDER_SUCCESSFUL:
      return {
        ...state,
        orderDetails: action.data.orders,
        success: true
      };
    case GET_ALL_CATERER_ORDER_UNSUCCESSFUL:
      return {
        ...state,
        error: action.error
      };
    case CANCEL_ORDER_SUCCESSFUL:
      return {
        ...state,
        success: true,
        passes: action.data
      };
    case CANCEL_ORDER_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        error: action.error.response.data
      };
    default:
      return {
        ...state
      };
  }
};

export default orderReducer;