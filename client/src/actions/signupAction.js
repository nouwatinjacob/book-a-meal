import axios from 'axios';
import { reDirect } from '../utils/helper';
import {
  SIGNUP_SUCCESSFUL,
  SIGNUP_UNSUCCESSFUL } from './actionTypes';

const signupAction = userDatas => (dispatch) => {
  axios.post('http://localhost:8000/api/v1/auth/signup', userDatas)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      dispatch({ type: SIGNUP_SUCCESSFUL });
      reDirect(token);
    })
    .catch((err) => {      
      dispatch({
        type: SIGNUP_UNSUCCESSFUL,
        payload: 'Registration Failed'
      });
    });
};

export default signupAction;