import axios from 'axios';
import { reDirect, logout } from '../utils/helper';

import { LOGIN_SUCCESSFUL, LOGIN_UNSUCCESSFUL, CLEAR_STATE } from './actionTypes';

const loginAction = loginData => (dispatch) => {
  axios.post('http://localhost:8000/api/v1/auth/login', loginData)
    .then((res) => {
      const { token } = res.data; // get the token
      localStorage.setItem('token', token);
      dispatch({ type: LOGIN_SUCCESSFUL,
        message: res.data });
      reDirect(token);
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_UNSUCCESSFUL,
        payload: 'Invalid Credentials'
      });
    });
};

const logoutAction = () => (dispatch) => {
  dispatch({ type: CLEAR_STATE });
  logout();
};

export {
  loginAction,
  logoutAction
};