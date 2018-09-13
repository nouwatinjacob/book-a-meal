import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionTypes from '../../src/constants/actionTypes';
import {
  signupResponse
} from '../__mockData__/mockUser';
import signupAction from '../../src/actions/signupAction';
import signupReducer from '../../src/reducers/signupReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const initialState = {
  success: false,
  user: {},
  loading: false
};

describe('Test SignupReducer', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should update signup state if signup', () => {
    moxios.stubRequest('/auth/signup', {
      status: 200,
      response: signupResponse
    });
    return store.dispatch(signupAction({}))
      .then(() => {
        const actions = store.getActions();
        const newState = signupReducer(initialState, actions[1]);
        expect(newState.success).toEqual(true);
        expect(newState.loading).toEqual(false);
      });
  });

  it('should update signup state if error occur when signup', () => {
    moxios.stubRequest('/auth/signup', {
      status: 400,
      response: 'Error occur signing up'
    });
    return store.dispatch(signupAction({}))
      .then(() => {
        const actions = store.getActions();
        const newState = signupReducer(initialState, actions[3]);
        expect(newState.success).toEqual(false);
      });
  });

  it(`should update the loading state in signup reducer 
  if loading is set true`, () => {
    moxios.stubRequest('/auth/signup', {
      status: 200,
      response: signupResponse
    });
    return store.dispatch(signupAction({}))
      .then(() => {
        const actions = store.getActions();
        const newState = signupReducer(initialState, actions[0]);
        expect(newState.loading).toEqual(true);
      });
  });

  it('should update initial state if no action dispatch', () => {
    const newState = signupReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
});