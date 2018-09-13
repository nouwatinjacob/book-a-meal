import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionTypes from '../../src/constants/actionTypes';
import {
  makeOrderAction,
  getUserOrderAction,
  getAnOrderAction,
  modifyOrderAction,
  getAllCatererOrderAction,
  cancelOrderAction
} from '../../src/actions/orderAction';
import {
  makeOrderResponse,
  getAnOrderResponse,
  modifyOrderResponse,
  catererOrderResponse,
  userOrderResponse
} from '../__mockData__/mockOrder';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test orderActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should return MAKE_ORDER_SUCCESSFUL when order is placed', () => {
    const store = mockStore({});
    moxios.stubRequest('/orders', {
      status: 201,
      response: makeOrderResponse
    });
    const expectedAction = {
      type: actionTypes.MAKE_ORDER_SUCCESSFUL,
      data: {
        order: makeOrderResponse.order
      }
    };
    return store.dispatch(makeOrderAction({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => error);
  });

  it('should return MAKE_ORDER_UNSUCCESSFUL when order is placed', () => {
    const store = mockStore({});
    moxios.stubRequest('/orders', {
      status: 400,
      response: 'Error placing order'
    });
    const expectedAction = {
      type: actionTypes.MAKE_ORDER_UNSUCCESSFUL,
      error: 'Error placing order'
    };
    return store.dispatch(makeOrderAction({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => error);
  });

  it('should return GET_AN_ORDER_SUCCESSFUL when getting an order', () => {
    const store = mockStore({});
    moxios.stubRequest('/order/1', {
      status: 200,
      response: getAnOrderResponse
    });
    const expectedAction = {
      type: actionTypes.GET_AN_ORDER_SUCCESSFUL,
      data: {
        order: getAnOrderResponse
      }
    };
    return store.dispatch(getAnOrderAction(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => error);
  });

  it('should return GET_AN_ORDER_UNSUCCESSFUL when getting an order', () => {
    const store = mockStore({});
    moxios.stubRequest('/order/1', {
      status: 400,
      response: 'Error retrieving order'
    });
    const expectedAction = {
      type: actionTypes.GET_AN_ORDER_UNSUCCESSFUL,
      error: 'Error retrieving order'
    };
    return store.dispatch(getAnOrderAction(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => error);
  });

  it(
    `should return MODIFY_ORDER_SUCCESSFUL 
    when modifying an order`,
    (done) => {
      const store = mockStore({});
      moxios.stubRequest('/orders/1', {
        status: 200,
        response: modifyOrderResponse
      });
      const expectedAction = {
        type: actionTypes.MODIFY_ORDER_SUCCESSFUL,
        data: {
          order: modifyOrderResponse
        }
      };
      store.dispatch(modifyOrderAction(8, { quantity: 5 }))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
        }, 3000)
        .catch(error => done(error));
      done();
    }
  );

  it(
    `should return MODIFY_ORDER_UNSUCCESSFUL 
    when error occur modifying an order`,
    (done) => {
      const store = mockStore({});
      moxios.stubRequest('/orders/1', {
        status: 400,
        response: 'Error modifying order'
      });
      const expectedAction = {
        type: actionTypes.MODIFY_ORDER_UNSUCCESSFUL,
        error: 'Error modifying order'
      };
      store.dispatch(modifyOrderAction(8, { quantity: 5 }))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
        })
        .catch(error => done(error));
      done();
    }
  );

  it('should return CANCEL_ORDER_SUCCESSFUL when deleting an order', (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/order/1`, {
      status: 200,
      response: {
        message: "Order cancelled succesfully"
      }
    });
    const expectedAction = {
      type: actionTypes.CANCEL_ORDER_SUCCESSFUL,
      data: 1
    };
    store.dispatch(cancelOrderAction(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => done(error));
    done();
  });

  it(
    `should return CANCEL_ORDER_UNSUCCESSFUL 
    when error occur deleting an order`,
    (done) => {
      const store = mockStore({});
      moxios.stubRequest('/orders/1', {
        status: 400,
        response: 'Error deleting order'
      });
      const expectedAction = {
        type: actionTypes.CANCEL_ORDER_UNSUCCESSFUL,
        error: 'Error deleting order'
      };
      store.dispatch(cancelOrderAction(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
        })
        .catch(error => done(error));
      done();
    }
  );

  it(`should return GET_ALL_CATERER_ORDER_SUCCESSFUL 
  when getting a caterer's order`, (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/orders?orderDate=2018-09-07&limit=3&offset=0`, {
      status: 200,
      response: catererOrderResponse
    });
    const expectedAction = {
      type: actionTypes.GET_ALL_CATERER_ORDER_SUCCESSFUL,
      data: {
        orders: catererOrderResponse.orders,
        paginate: catererOrderResponse.paginate
      }
    };
    store.dispatch(getAllCatererOrderAction({
      orderDate: '2018-09-07',
      limit: 3,
      offset: 0
    }))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => done(error));
    done();
  });

  it(
    `should return GET_ALL_CATERER_ORDER_UNSUCCESSFUL 
    when error occur deleting an order`,
    (done) => {
      const store = mockStore({});
      moxios.stubRequest(`/orders?orderDate=2018-09-07&limit=3&offset=0`, {
        status: 400,
        response: 'Error retrieving caterer order'
      });
      const expectedAction = {
        type: actionTypes.GET_ALL_CATERER_ORDER_UNSUCCESSFUL,
        error: 'Error retrieving caterer order'
      };
      store.dispatch(getAllCatererOrderAction({
        orderDate: '2018-09-07',
        limit: 3,
        offset: 0
      }))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
        })
        .catch(error => done(error));
      done();
    }
  );

  it(`should return GET_USER_ORDER_SUCCESSFUL 
  when getting a user's order`, (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/user-orders?limit=5&offset=0`, {
      status: 200,
      response: userOrderResponse
    });
    const expectedAction = {
      type: actionTypes.GET_USER_ORDER_SUCCESSFUL,
      data: {
        orders: userOrderResponse
      }
    };
    store.dispatch(getUserOrderAction({
      limit: 5,
      offset: 0
    }))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => done(error));
    done();
  });

  it(`should return GET_USER_ORDER_UNSUCCESSFUL 
  when error occur getting a user's order`, (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/user-orders?limit=5&offset=0`, {
      status: 400,
      response: 'Error retrieving user order'
    });
    const expectedAction = {
      type: actionTypes.GET_USER_ORDER_UNSUCCESSFUL,
      error: 'Error retrieving user order'
    };
    store.dispatch(getUserOrderAction({
      limit: 5,
      offset: 0
    }))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => done(error));
    done();
  });
});