import axios from 'axios';
import { 
  MAKE_ORDER_SUCCESSFUL, MAKE_ORDER_UNSUCCESSFUL,
  GET_USER_ORDER_SUCCESSFUL, GET_USER_ORDER_UNSUCCESSFUL
} from '../actions/actionTypes';
import { authorization } from '../utils/helper';

const makeOrderSuccess = data => ({
  type: MAKE_ORDER_SUCCESSFUL,
  data
});

const makeOrderUnsuccess = error => ({
  type: MAKE_ORDER_UNSUCCESSFUL,
  error
});

const getUserOrderSuccess = data => ({
  type: GET_USER_ORDER_SUCCESSFUL,
  data
});

const getUserOrderUnsuccess = error => ({
  type: GET_USER_ORDER_UNSUCCESSFUL,
  error
})

const makeOrderAction = orderDetail => (dispatch) => {
  axios.post('http://localhost:8000/api/v1/orders', orderDetail, authorization())
    .then((res) => {
      dispatch(makeOrderSuccess({
        order: res.data
      }));
    })
    .catch((err) => {
      dispatch(makeOrderUnsuccess(err));
    });
};

const getUserOrderAction = () => (dispatch) => {
  axios.get('http://localhost:8000/api/v1/user-orders', authorization())
    .then((res) => {
      dispatch(getUserOrderSuccess({
        orders: res.data
      }))
    })
    .catch((err) => {
      dispatch(getUserOrderUnsuccess(err));
    });
};

export {
  makeOrderAction,
  getUserOrderAction
};