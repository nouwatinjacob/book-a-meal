import axios from 'axios';
import { toast } from 'react-toastify';
import { reDirect, logout } from '../utils/helper';

import { 
  LOGIN_SUCCESSFUL,
  CLEAR_STATE } from '../constants/actionTypes';

const notify = () => toast.info('Invalid Credentials');
const loginAction = loginData => (dispatch) => {
  axios.post('/auth/login', loginData)
    .then((res) => {
      const { token } = res.data; // get the token
      localStorage.setItem('token', token);
      dispatch({ type: LOGIN_SUCCESSFUL,
        message: res.data });
      reDirect(token);
    })
    .catch(() => {
      notify();
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