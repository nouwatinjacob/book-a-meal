import axios from 'axios';
import {
  toast
} from 'react-toastify';
import {
  reDirect,
  logout
} from '../utils/helper';

import {
  LOGIN_SUCCESSFUL,
  CLEAR_STATE,
  SET_LOADING_STATE
} from '../constants/actionTypes';

const notify = () => toast.info('Invalid Credentials');

export const loginSucessful = data => ({
  type: LOGIN_SUCCESSFUL,
  data
});
const loginAction = loginData => (dispatch) => {
  dispatch({
    type: SET_LOADING_STATE,
    payload: true
  });
  return axios.post('/auth/login', loginData)
    .then((res) => {
      const {
        token
      } = res.data; // get the token
      localStorage.setItem('token', token);
      dispatch({
        type: LOGIN_SUCCESSFUL
      });
      reDirect(token);
    })
    .catch((err) => {
      notify();
      return dispatch({
        type: SET_LOADING_STATE,
        payload: false
      });
    });
};

const logoutAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_STATE
  });
  logout();
};

export {
  loginAction,
  logoutAction
};