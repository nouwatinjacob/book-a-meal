import axios from 'axios';
import {
  MAKE_ORDER_SUCCESSFUL, MAKE_ORDER_UNSUCCESSFUL,
  GET_USER_ORDER_SUCCESSFUL, GET_USER_ORDER_UNSUCCESSFUL,
  GET_AN_ORDER_SUCCESSFUL, GET_AN_ORDER_UNSUCCESSFUL,
  MODIFY_ORDER_SUCCESSFUL, MODIFY_ORDER_UNSUCCESSFUL,
  GET_ALL_CATERER_ORDER_SUCCESSFUL, GET_ALL_CATERER_ORDER_UNSUCCESSFUL,
  CANCEL_ORDER_SUCCESSFUL, CANCEL_ORDER_UNSUCCESSFUL
} from '../constants/actionTypes';
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
});

const getAnOrderSuccess = data => ({
  type: GET_AN_ORDER_SUCCESSFUL,
  data
});

const getAnOrderUnsuccess = error => ({
  type: GET_AN_ORDER_UNSUCCESSFUL,
  error
});

const modifyOrderSuccess = data => ({
  type: MODIFY_ORDER_SUCCESSFUL,
  data
});

const modifyOrderUnsuccess = error => ({
  type: MODIFY_ORDER_UNSUCCESSFUL,
  error
});

const getAllCatererOrderSuccess = data => ({
  type: GET_ALL_CATERER_ORDER_SUCCESSFUL,
  data
});

const getAllCatererOrderUnsuccess = error => ({
  type: GET_ALL_CATERER_ORDER_UNSUCCESSFUL,
  error
});

const cancelOrderSuccess = data => ({
  type: CANCEL_ORDER_SUCCESSFUL,
  data
});

const cancelOrderUnSuccess = error => ({
  type: CANCEL_ORDER_UNSUCCESSFUL,
  error
});

const makeOrderAction = orderDetail => dispatch =>
  axios.post(
    '/orders',
    orderDetail, authorization()
  )
    .then((res) => {
      dispatch(makeOrderSuccess({
        order: res.data
      }));
    })
    .catch((err) => {
      dispatch(makeOrderUnsuccess(err));
    });

const getUserOrderAction = ({ limit, offset }) => dispatch =>
  axios.get(`/user-orders?limit=${limit}&offset=${offset}`, authorization())
    .then((res) => {
      dispatch(getUserOrderSuccess({
        orders: res.data
      }));
    })
    .catch((err) => {
      dispatch(getUserOrderUnsuccess(err));
    });

const getAnOrderAction = orderId => dispatch =>
  axios.get(`/order/${orderId}`, authorization())
    .then((res) => {
      dispatch(getAnOrderSuccess({
        order: res.data
      }));
    })
    .catch((err) => {
      dispatch(getAnOrderUnsuccess(err));
    });

const modifyOrderAction = (orderId, newOrderDetail) => dispatch =>
  axios.put(
    `/orders/${orderId}`,
    newOrderDetail, authorization()
  )
    .then((res) => {
      dispatch(modifyOrderSuccess({
        order: res.data
      }));
    })
    .catch((err) => {
      dispatch(modifyOrderUnsuccess(err));
    });

const getAllCatererOrderAction = ({ orderDate, limit, offset }) =>
  dispatch => axios.get(
    `/orders?orderDate=${orderDate}&limit=${limit}&offset=${offset}`,
    authorization()
  )
    .then((res) => {
      dispatch(getAllCatererOrderSuccess({
        orders: res.data.orders,
        paginate: res.data.paginate
      }));
    })
    .catch((err) => {
      dispatch(getAllCatererOrderUnsuccess(err));
    });

const cancelOrderAction = orderId => dispatch =>
  axios.delete(`/orders/${orderId}`, authorization())
    .then((res) => {
      dispatch(cancelOrderSuccess(orderId));
    })
    .catch(error => dispatch(cancelOrderUnSuccess(error)));

export {
  makeOrderAction,
  getUserOrderAction,
  getAnOrderAction,
  modifyOrderAction,
  getAllCatererOrderAction,
  cancelOrderAction,
  makeOrderSuccess,
  makeOrderUnsuccess,
  getUserOrderSuccess,
  getUserOrderUnsuccess,
  getAnOrderSuccess,
  getAnOrderUnsuccess,
  modifyOrderSuccess,
  modifyOrderUnsuccess,
  getAllCatererOrderSuccess,
  getAllCatererOrderUnsuccess,
  cancelOrderSuccess,
  cancelOrderUnSuccess
};