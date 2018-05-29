import {
  GET_MEAL_SUCCESSFUL,
  GET_MEAL_UNSUCCESSFUL
} from '../actions/actionTypes';

const initialState = {
  meals: [],
  error: null,
  success: false,
  loading: true
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEAL_SUCCESSFUL:
      return {
        ...state,
        success: true,
        meals: action.data.meals,
        loading: false
      };
    case GET_MEAL_UNSUCCESSFUL:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};

export default mealReducer;