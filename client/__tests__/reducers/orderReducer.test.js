import orderReducer from '../../src/reducers/orderReducer';
import {
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
} from '../../src/actions/orderAction';

import {
  makeOrderResponse,
  getAnOrderResponse,
  modifyOrderResponse,
  catererOrderResponse,
  userOrderResponse
} from '../__mockData__/mockOrder';

const initialState = {
  error: null,
  success: false,
  loading: true,
  order: {},
  orders: {},
  orderDetails: {},
  passes: null
};

describe('Test orderReducer -MAKE ORDER', () => {
  it('should update state when make order', () => {
    const action = makeOrderSuccess(makeOrderResponse);
    const newState = orderReducer(initialState, action);
    expect(newState.order).toEqual(makeOrderResponse);
  });

  it(`should update state with errors when make order request fails`, () => {
    const action = makeOrderUnsuccess('Error messages');
    const newState = orderReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test orderReducer -GET USER ORDER', () => {
  it('should update state when get user order', () => {
    const action = getUserOrderSuccess({ orders: userOrderResponse });
    const newState = orderReducer(initialState, action);
    expect(newState.orders.orders).toEqual(userOrderResponse.orders);
    expect(newState.orders.paginate).toEqual(userOrderResponse.paginate);
  });

  it(`should update state with errors when get 
  user order request fails`, () => {
    const action = getUserOrderUnsuccess('Error messages');
    const newState = orderReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test orderReducer -GET AN ORDER', () => {
  it('should update state when get an order', () => {
    const action = getAnOrderSuccess(getAnOrderResponse);
    const newState = orderReducer(initialState, action);
    expect(newState.order).toEqual(getAnOrderResponse.order);
  });

  it(`should update state with errors when get 
  an order request fails`, () => {
    const action = getAnOrderUnsuccess('Error messages');
    const newState = orderReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test orderReducer -MODIFY', () => {
  it(`should update state with errors when modify order request fails`, () => {
    const action = modifyOrderUnsuccess('Error messages');
    const newState = orderReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test orderReducer -GET CATERER ORDER', () => {
  it('should update state when get caterer order', () => {
    const action = getAllCatererOrderSuccess({
      orders: catererOrderResponse.orders,
      paginate: catererOrderResponse.paginate
    });
    const newState = orderReducer(initialState, action);
    expect(newState.orderDetails).toEqual(catererOrderResponse.orders);
    expect(newState.paginate).toEqual(catererOrderResponse.paginate);
  });

  it(`should update state with errors when get 
  caterer order request fails`, () => {
    const action = getAllCatererOrderUnsuccess('Error messages');
    const newState = orderReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test orderReducer -DELETE', () => {
  it('should update state when order cancel', () => {
    const action = cancelOrderSuccess(makeOrderResponse.order.id);
    const newInitialState = { orders: { orders: [makeOrderResponse.order] } };
    const newState = orderReducer(newInitialState, action);
    expect(newState.orders.orders).toEqual([]);
  });

  it(`should update state with errors when order cancel request fails`, () => {
    const action = cancelOrderUnSuccess('Error messages');
    const newState = orderReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test orderReducer -NO ACTION', () => {
  it('should update initial state if no action dispatch', () => {
    const newState = orderReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
});