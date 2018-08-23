import axios from 'axios';
import { reDirect } from '../utils/helper';
import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL } from '../constants/actionTypes';

const notify = () => toast.error('Network Error');

const signupAction = userDatas => dispatch =>
  axios.post('/auth/signup', userDatas)
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

export default signupAction;