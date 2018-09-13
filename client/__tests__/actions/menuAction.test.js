import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionTypes from '../../src/constants/actionTypes';
import {
  setMenuAction,
  getMenuAction
} from '../../src/actions/menuAction';
import {
  menuResponse,
  retrieveMenuResponse
} from '../__mockData__/mockMenu';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test menuActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should return SET_MENU_SUCCESSFUL when menu is set', (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/menu`, {
      status: 201,
      response: menuResponse
    });
    const expectedAction = {
      type: actionTypes.SET_MENU_SUCCESSFUL,
      data: {
        passes: {
          meals: menuResponse.meals,
          paginate: menuResponse.paginate
        }
      }
    };
    store.dispatch(setMenuAction({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => done(error));

    done();
  });

  it(
    'should return SET_MENU_UNSUCCESSFUL when error occur setting menu',
    (done) => {
      const store = mockStore({});
      moxios.stubRequest(`/menu`, {
        status: 400,
        response: 'Error setting menu'
      });
      const expectedAction = {
        type: actionTypes.SET_MENU_UNSUCCESSFUL,
        error: 'Error setting menu'
      };
      store.dispatch(setMenuAction({}))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
        })
        .catch(error => done(error));

      done();
    }
  );

  it('should return GET_MENU_SUCCESSFUL when menu is retrieved', () => {
    const store = mockStore({});
    moxios.stubRequest(`/menu?menuDate=2018-09-07&limit=5&offset=0`, {
      status: 200,
      response: retrieveMenuResponse
    });
    const expectedAction = {
      type: actionTypes.GET_MENU_SUCCESSFUL,
      data: {
        menus: {
          retrieveMenuResponse
        }
      }
    };
    return store.dispatch(getMenuAction({
      todayDate: '2018-09-07', limit: 5, offset: 0
    }))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => error);
  });

  it(
    'should return GET_MENU_UNSUCCESSFUL when menu is not retrieved',
    () => {
      const store = mockStore({});
      moxios.stubRequest(`/menu?menuDate=2018-09-07&limit=5&offset=0`, {
        status: 400,
        response: 'Error retrieving menu'
      });
      const expectedAction = {
        type: actionTypes.GET_MENU_UNSUCCESSFUL,
        error: 'Error retrieving menu'
      };
      return store.dispatch(getMenuAction({
        todayDate: '2018-09-07', limit: 5, offset: 0
      }))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
        }, 3000)
        .catch(error => done(error));
    }
  );
});