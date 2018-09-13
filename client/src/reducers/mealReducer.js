import {
  GET_MEAL_SUCCESSFUL,
  GET_MEAL_UNSUCCESSFUL,
  ADD_MEAL_SUCCESSFUL,
  ADD_MEAL_UNSUCCESSFUL,
  GET_A_MEAL_SUCCESSFUL,
  GET_A_MEAL_UNSUCCESSFUL,
  EDIT_MEAL_SUCCESSFUL,
  EDIT_MEAL_UNSUCCESSFUL,
  DELETE_MEAL_SUCCESSFUL,
  DELETE_MEAL_UNSUCCESSFUL,
  SET_LOADING_STATE
} from '../constants/actionTypes';

const initialState = {
  meals: {},
  meal: {},
  error: null,
  success: false,
  loading: false,
};

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEAL_SUCCESSFUL:
      return {
        ...state,
        success: true,
        meals: action.data.meals,
        paginate: action.data.paginate,
        loading: false
      };
    case GET_MEAL_UNSUCCESSFUL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case SET_LOADING_STATE:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_MEAL_SUCCESSFUL:
      return {
        ...state,
        success: true,
        loading: false,
        meal: action.data.meal
      };
    case ADD_MEAL_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error
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
        loading: false,
        meal: action.data.meal,
        meals: {
          meals: state.meals.map((meal) => {
            if (meal.id === action.data.meal.id) {
              return {
                ...meal,
                ...action.data.meal
              };
            }
            return meal;
          })
        }
      };
    case EDIT_MEAL_UNSUCCESSFUL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.error
      };
    case DELETE_MEAL_SUCCESSFUL:
      return {
        ...state,
        success: true,
        loading: false,
        meals: {
          meals: state.meals.filter(meal => meal.id !== action.data)
        }
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