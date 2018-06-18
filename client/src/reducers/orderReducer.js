import { 
  MAKE_ORDER_SUCCESSFUL, MAKE_ORDER_UNSUCCESSFUL,
  GET_USER_ORDER_SUCCESSFUL, GET_USER_ORDER_UNSUCCESSFUL
} from '../actions/actionTypes';

const initialState = {
  error: null,
  success: false,
  loading: true,
  order: [],
  orders: []
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
        error: action.error
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
    default:
      return {
        ...state
      };
  }
};

export default orderReducer;