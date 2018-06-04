import axios from 'axios';
import { reDirect } from '../utils/helper';
import { LOGIN_SUCCESSFUL, LOGIN_UNSUCCESSFUL, LOG_OUT_SUCCESS } from './actionTypes';

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
  dispatch({ type: LOG_OUT_SUCCESS });
  logout();
};

export {
  loginAction,
  logoutAction
};