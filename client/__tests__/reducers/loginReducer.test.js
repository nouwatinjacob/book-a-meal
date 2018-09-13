import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionTypes from '../../src/constants/actionTypes';
import {
  loginResponse
} from '../__mockData__/mockUser';
import {
  loginAction,
  logoutAction
} from '../../src/actions/loginAction';
import loginReducer from '../../src/reducers/loginReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const initialState = {
  success: false,
  user: {},
  loading: false
};

describe('Test loginReducer', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should update the login state if login successful', () => {
    moxios.stubRequest('/auth/login', {
      status: 200,
      response: loginResponse
    });
    return store.dispatch(loginAction({}))
      .then(() => {
        const actions = store.getActions();
        const newState = loginReducer(initialState, actions[1]);
        expect(newState.success).toEqual(true);
        expect(newState.loading).toEqual(false);
      });
  });

  it('should update the loading state if loading is set true', () => {
    moxios.stubRequest('/auth/login', {
      status: 200,
      response: loginResponse
    });
    return store.dispatch(loginAction({}))
      .then(() => {
        const actions = store.getActions();
        const newState = loginReducer(initialState, actions[0]);
        expect(newState.loading).toEqual(true);
      });
  });

  it('should update the login state if logout successful', () => {
    store.dispatch(logoutAction());
    const actions = store.getActions();
    const newState = loginReducer(initialState, actions[4]);
    expect(newState.success).toEqual(false);
  });

  it('should update initial state if no action dispatch', () => {
    const newState = loginReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
});

