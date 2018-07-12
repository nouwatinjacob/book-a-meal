import axios from 'axios';
import history from './history';
import { CLEAR_STATE } from '../actions/actionTypes';

export default {
  responseInterceptors: (store) => {
    axios.interceptors.response.use(response => response, (error) => {
      console.log(error, 'response>>>>>>');
      // catch 401
      if (error.response.status === 401) {
        console.log("opps 401");
        store.dispatch({ type: CLEAR_STATE });
        localStorage.removeItem('token');
        history.push('/login');
      }
      return Promise.reject(error);
    });
  }
};