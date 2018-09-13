import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  loginAction,
  logoutAction
} from '../../src/actions/loginAction';
import * as actionTypes from '../../src/constants/actionTypes';
import { loginResponse } from '../__mockData__/mockUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Test loginAction', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should return LOGIN_SUCCESSFUL when sign in', () => {
    const expectedLoadingAction = {
      type: actionTypes.SET_LOADING_STATE, payload: true
    };
    const expectedLoginAction = {
      type: actionTypes.LOGIN_SUCCESSFUL
    };

    moxios.stubRequest('/auth/login', {
      status: 200,
      response: loginResponse
    });
    return store.dispatch(loginAction({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedLoadingAction);
        expect(actions[1]).toEqual(expectedLoginAction);
      });
  });

  it('should return LOG_OUT_SUCCESS when logout', () => {
    const expectedLogoutAction = {
      type: actionTypes.CLEAR_STATE
    };

    moxios.stubRequest('/auth/login', {
      status: 200
    });
    store.dispatch(logoutAction());
    const actions = store.getActions();
    expect(actions[2]).toEqual(expectedLogoutAction);
  });
});