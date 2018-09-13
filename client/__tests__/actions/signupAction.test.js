import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import signupAction from '../../src/actions/signupAction';
import * as actionTypes from '../../src/constants/actionTypes';
import { signupResponse, signupDetails } from '../__mockData__/mockUser';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Test signupAction', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should return SIGNUP_SUCCESSFUL when signup', () => {
    moxios.stubRequest('/auth/signup', {
      status: 201,
      response: signupResponse
    });

    const expectedLoadingAction = {
      type: actionTypes.SET_LOADING_STATE, payload: true
    };
    const expectedSignupAction = {
      type: actionTypes.SIGNUP_SUCCESSFUL
    };
    return store.dispatch(signupAction({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedLoadingAction);
        expect(actions[1]).toEqual(expectedSignupAction);
      });
  });
});
