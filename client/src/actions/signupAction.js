import axios from 'axios';
import { reDirect } from '../utils/helper';
import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL,
  SET_LOADING_STATE
} from '../constants/actionTypes';

const signupAction = userDatas => (dispatch) => {
  dispatch({
    type: SET_LOADING_STATE,
    payload: true
  });
  return axios.post('/auth/signup', userDatas)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      dispatch({ type: SIGNUP_SUCCESSFUL });
      reDirect(token);
    })
    .catch((err) => {
      dispatch({
        type: SIGNUP_UNSUCCESSFUL,
        error: err.response.data
      });
    });
};

export default signupAction;