import axios from 'axios';
import { toast } from 'react-toastify';
import { authorization } from '../utils/helper';
import {
  GET_MEAL_SUCCESSFUL, GET_MEAL_UNSUCCESSFUL,
  ADD_MEAL_SUCCESSFUL, ADD_MEAL_UNSUCCESSFUL,
  GET_A_MEAL_SUCCESSFUL, GET_A_MEAL_UNSUCCESSFUL,
  EDIT_MEAL_SUCCESSFUL, EDIT_MEAL_UNSUCCESSFUL,
  DELETE_MEAL_SUCCESSFUL, DELETE_MEAL_UNSUCCESSFUL
} from '../actions/actionTypes';

const getMealSuccess = data => ({
  type: GET_MEAL_SUCCESSFUL,
  data
});

const getMealUnsuccess = error => ({
  type: GET_MEAL_UNSUCCESSFUL,
  error
});

const addMealSuccess = data => ({
  type: ADD_MEAL_SUCCESSFUL,
  data
});

const addMealUnsuccess = error => ({
  type: ADD_MEAL_UNSUCCESSFUL,
  error
});

const getAMealSuccess = data => ({
  type: GET_A_MEAL_SUCCESSFUL,
  data
});

const getAMealUnsuccess = error => ({
  type: GET_A_MEAL_UNSUCCESSFUL,
  error
});

const editMealSuccess = data => ({
  type: EDIT_MEAL_SUCCESSFUL,
  data
});

const editMealUnsuccess = error => ({
  type: EDIT_MEAL_UNSUCCESSFUL,
  error
});

const deleteMealSuccess = data => ({
  type: DELETE_MEAL_SUCCESSFUL,
  data
});

const deleteMealUnsuccess = error => ({
  type: DELETE_MEAL_UNSUCCESSFUL,
  error
});

const notify = () => {
  toast("Meal Deleted Successfully");
};

const getMeals = () => (dispatch => ( 
  axios.get('http://localhost:8000/api/v1/meals', authorization())
    .then((res) => {
      dispatch(getMealSuccess({
        meals: res.data.meals
      }));
    })
    .catch((err) => {
      dispatch(getMealUnsuccess(err));
    })
)
);

const addMeal = mealDetail => (dispatch) => {
  axios.post('http://localhost:8000/api/v1/meals', mealDetail, authorization())
    .then((res) => {
      dispatch(addMealSuccess({
        passes: res.data
      }));
    })
    .catch((err) => {
      dispatch(addMealUnsuccess(err));
    });
};

const getAMealAction = id => (dispatch => ( 
  axios.get(`http://localhost:8000/api/v1/meals/${id}`, authorization())
    .then((res) => {
      dispatch(getAMealSuccess({
        meal: res.data.meal
      }));
    })
    .catch((err) => {
      dispatch(getAMealUnsuccess(err));
    })
)
);

const editMealAction = (mealDetail, id) => (dispatch) => {
  axios.put(
    `http://localhost:8000/api/v1/meals/${id}`,
    mealDetail, authorization()
  )
    .then((res) => {
      dispatch(editMealSuccess({
        passes: res.data
      }));
    })
    .catch((err) => {
      dispatch(editMealUnsuccess(err));
    });
};

const deleteMealAction = mealId => (dispatch) => {
  axios.delete(`http://localhost:8000/api/v1/meals/${mealId}`, authorization())
    .then((res) => {
      dispatch(deleteMealSuccess(res.data.message));
      this.notify();
    })
    .catch(error => dispatch(deleteMealUnsuccess(error)));
};


export {
  getMeals,
  addMeal,
  getAMealAction,
  editMealAction,
  deleteMealAction
};