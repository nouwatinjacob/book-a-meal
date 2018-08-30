import axios from 'axios';
import { authorization } from '../utils/helper';
import {
  SET_MENU_SUCCESSFUL, SET_MENU_UNSUCCESSFUL,
  GET_MENU_SUCCESSFUL, GET_MENU_UNSUCCESSFUL,
} from '../constants/actionTypes';

const setMenuSuccess = data => ({
  type: SET_MENU_SUCCESSFUL,
  data
});

const setMenuUnsuccess = error => ({
  type: SET_MENU_UNSUCCESSFUL,
  error
});

const getMenuSuccess = data => ({
  type: GET_MENU_SUCCESSFUL,
  data
});

const getMenuUnsuccess = error => ({
  type: GET_MENU_UNSUCCESSFUL,
  error
});

const setMenuAction = menuDetail => dispatch =>
  axios.post('/menu', menuDetail, authorization())
    .then((res) => {
      dispatch(setMenuSuccess({
        passes: res.data
      }));
    })
    .catch((err) => {
      dispatch(setMenuUnsuccess(err));
    });

const getMenuAction = ({ todayDate, limit, offset }) => (dispatch) => {
  axios.get(
    `/menu?menuDate=${todayDate}&limit=${limit}&offset=${offset}`,
    authorization()
  )
    .then((res) => {
      dispatch(getMenuSuccess({
        menus: res.data,
      }));
    })
    .catch((err) => {
      dispatch(getMenuUnsuccess(err));
    });
};

export {
  setMenuAction,
  getMenuAction
};