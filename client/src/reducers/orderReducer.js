import { MAKE_ORDER_SUCCESSFUL, MAKE_ORDER_UNSUCCESSFUL
} from '../actions/actionTypes';

const initialState = {
  error: null,
  success: false,
  loading: true,
  order: []
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_ORDER_SUCCESSFUL:
      return {
        ...state,
        order: action.res.data,
        success: true,
        loading: false
      };
    case MAKE_ORDER_UNSUCCESSFUL:
      return {
        ...state,
        error: action.error,
        order: null
      };
    default:
      return {
        ...state
      };
  }
};

export default orderReducer;