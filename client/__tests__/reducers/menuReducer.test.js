import menuReducer from '../../src/reducers/menuReducer';
import {
  setMenuSuccess,
  setMenuUnsuccess,
  getMenuSuccess,
  getMenuUnsuccess
} from '../../src/actions/menuAction';

import {
  setMenuResponse,
  retrieveMenuResponse
} from '../__mockData__/mockMenu';

const initialState = {
  menu: [],
  menus: {
    message: '',
    dateMenu: []
  },
  error: null,
  success: false,
  loading: false,
  passes: null
};

describe('Test menuReducer -SET MENU', () => {
  it('should update state when menu is set', () => {
    const action = setMenuSuccess(setMenuResponse);
    const newState = menuReducer(initialState, action);
    expect(newState.passes).toEqual(setMenuResponse.menu);
    expect(newState.success).toEqual(true);
  });

  it(`should update state with errors when set menu request fails`, () => {
    const action = setMenuUnsuccess('Error messages');
    const newState = menuReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.loading).toEqual(false);
  });
});

describe('Test menuReducer -GET MENU', () => {
  it('should update state when get menu', () => {
    const action = getMenuSuccess({ menus: retrieveMenuResponse });
    const newState = menuReducer(initialState, action);
    expect(newState.menus.paginate).toEqual(retrieveMenuResponse.paginate);
    expect(newState.menus.dateMenu).toEqual(retrieveMenuResponse.dateMenu);
    expect(newState.success).toEqual(true);
  });

  it(`should update state with errors when get menu request fails`, () => {
    const action = getMenuUnsuccess('Error messages');
    const newState = menuReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
  });
});

describe('Test menuReducer -MENU', () => {
  it('should update initial state if no action dispatch', () => {
    const newState = menuReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
});