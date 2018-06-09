import axios from 'axios';
import { authorization } from '../utils/helper';
import {
  SET_MENU_SUCCESSFUL, SET_MENU_UNSUCCESSFUL
} from '../actions/actionTypes';

const setMenuSuccess = data => ({
  type: SET_MENU_SUCCESSFUL,
  data
});

const setMenuUnsuccess = error => ({
  type: SET_MENU_UNSUCCESSFUL,
  error
});

const setMenuAction = menuDetail => (dispatch) => {
  axios.post('http://localhost:8000/api/v1//menu', menuDetail, authorization())
    .then((res) => {
      dispatch(setMenuSuccess({
        passes: res.data
      }));
    })
    .catch((err) => {
      dispatch(setMenuUnsuccess(err));
    });
};

export default setMenuAction; 