import {
  GET_MEAL_SUCCESSFUL, GET_MEAL_UNSUCCESSFUL,
  ADD_MEAL_SUCCESSFUL, ADD_MEAL_UNSUCCESSFUL,
  GET_A_MEAL_SUCCESSFUL, GET_A_MEAL_UNSUCCESSFUL,
  EDIT_MEAL_SUCCESSFUL, EDIT_MEAL_UNSUCCESSFUL,
  DELETE_MEAL_SUCCESSFUL, DELETE_MEAL_UNSUCCESSFUL
} from '../actions/actionTypes';

const initialState = {
  meals: [],
  meal: [],
  error: null,
  success: false,
  loading: true,
  passes: null
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
        error: action.error,
        loading: false
      };
    case ADD_MEAL_SUCCESSFUL:
      return {
        ...state,
        success: true,
        passes: action.data.message
      };
    case ADD_MEAL_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        passes: null,
        error: action.payload
      };
    case GET_A_MEAL_SUCCESSFUL:
      return {
        ...state,
        success: true,
        meal: action.data.meal
      };
    case GET_A_MEAL_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        meal: null,
        error: action.error
      };
    case EDIT_MEAL_SUCCESSFUL:
      return {
        ...state,
        success: true,
        passes: action.data.message
      };
    case EDIT_MEAL_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        passes: null,
        error: action.error
      };
    case DELETE_MEAL_SUCCESSFUL:
      return {
        ...state,
        success: true,
        passes: action.data.message
      };
    case DELETE_MEAL_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        passes: null,
        error: action.error
      };
    default:
      return {
        ...state
      };
  }
};

export default mealReducer;