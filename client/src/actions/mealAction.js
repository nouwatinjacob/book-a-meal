import axios from 'axios';
import { authorization } from '../utils/helper';
import {
  GET_MEAL_SUCCESSFUL,
  GET_MEAL_UNSUCCESSFUL
} from '../actions/actionTypes';

const getMealSuccess = data => ({
  type: GET_MEAL_SUCCESSFUL,
  data
});

const getMealUnsuccess = error => ({
  type: GET_MEAL_UNSUCCESSFUL,
  error
});

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

export default getMeals;