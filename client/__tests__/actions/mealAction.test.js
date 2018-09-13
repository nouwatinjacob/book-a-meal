import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import {
  getMeals,
  addMeal,
  getAMealAction,
  editMealAction,
  deleteMealAction
} from '../../src/actions/mealAction';
import {
  mealDetails,
  mealResponse,
  allMealResponse
} from '../__mockData__/mockMeal';
import * as actionTypes from '../../src/constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Test mealActions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should return ADD_MEAL_UNSUCCESSFUL when image not added', (done) => {
    const store = mockStore({});
    moxios.stubRequest('/meals', {
      status: 400,
      response: { message: 'Add Image to be uploaded' }
    });
    const expectedLoadingAction = {
      type: actionTypes.SET_LOADING_STATE, payload: true
    };
    const expectedmealAction = {
      type: actionTypes.ADD_MEAL_UNSUCCESSFUL,
      error: {
        error: { message: 'Add Image to be uploaded' }
      }
    };
    store.dispatch(addMeal(mealDetails))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedLoadingAction);
        expect(actions[1]).toEqual(expectedmealAction);
      })
      .catch(error => done(error));

    done();
  });

  it('should return GET_A_MEAL_SUCCESSFUL when a meal is gotten', (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/meals/1`, {
      status: 200,
      response: mealResponse
    });
    const expectedAction = {
      type: actionTypes.GET_A_MEAL_SUCCESSFUL,
      data: {
        meal: mealResponse.meal
      }
    };
    store.dispatch(getAMealAction(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      }, 3000)
      .catch(error => done(error));

    done();
  });

  it('should return GET_A_MEAL_UNSUCCESSFUL when error occur', (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/meals/1`, {
      status: 400,
      response: 'meal not gotten'
    });
    const expectedAction = {
      type: actionTypes.GET_A_MEAL_UNSUCCESSFUL,
      error: 'meal not gotten'
    };
    store.dispatch(getAMealAction(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[3]).toEqual(expectedAction);
      }, 3000)
      .catch(error => done(error));

    done();
  });

  it('should return EDIT_MEAL_SUCCESSFUL when meal is edited', (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/meals/1`, {
      status: 200,
      response: mealResponse
    });
    const expectedAction = {
      type: actionTypes.EDIT_MEAL_SUCCESSFUL,
      data: {
        meal: mealResponse.meal
      }
    };
    store.dispatch(editMealAction(mealDetails, 1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      }, 3000)
      .catch(error => done(error));

    done();
  });

  it('should return EDIT_MEAL_UNSUCCESSFUL when error occur', (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/meals/1`, {
      status: 400,
      response: 'Meal not edited'
    });
    const expectedAction = {
      type: actionTypes.EDIT_MEAL_UNSUCCESSFUL,
      error: 'Meal not edited'
    };
    store.dispatch(editMealAction(mealDetails, 1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(error => done(error));

    done();
  });

  it('should return DELETE_MEAL_SUCCESSFUL when meal is edited', (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/meals/1`, {
      status: 200,
      response: {
        message: 'Meal successfully deleted'
      }
    });
    const expectedAction = {
      type: actionTypes.DELETE_MEAL_SUCCESSFUL,
      data: 1
    };
    store.dispatch(deleteMealAction(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      }, 3000)
      .catch(error => done(error));

    done();
  });

  it(
    'should return DELETE_MEAL_UNSUCCESSFUL when error occur deleting',
    (done) => {
      const store = mockStore({});
      moxios.stubRequest(`/meals/1`, {
        status: 400,
        response: 'Meal not deleted'
      });
      const expectedAction = {
        type: actionTypes.DELETE_MEAL_UNSUCCESSFUL,
        error: 'Meal not deleted'
      };
      store.dispatch(deleteMealAction(1))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
        })
        .catch(error => done(error));

      done();
    }
  );

  it('should return GET_MEAL_SUCCESSFUL when retrieving meals', (done) => {
    const store = mockStore({});
    moxios.stubRequest(`/meals?limit=3&offset=0`, {
      status: 200,
      response: allMealResponse
    });
    const expectedAction = {
      type: actionTypes.EDIT_MEAL_SUCCESSFUL,
      data: allMealResponse
    };
    store.dispatch(getMeals(3, 0))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
      }, 3000)
      .catch(error => done(error));

    done();
  });

  it(
    'should return EDIT_MEAL_UNSUCCESSFUL when error occur retrieving meals',
    (done) => {
      const store = mockStore({});
      moxios.stubRequest(`/meals?limit=3&offset=0`, {
        status: 400,
        response: 'Error retrieving meals'
      });
      const expectedAction = {
        type: actionTypes.EDIT_MEAL_UNSUCCESSFUL,
        error: 'Error retrieving meals'
      };
      store.dispatch(getMeals(3, 0))
        .then(() => {
          const actions = store.getActions();
          expect(actions[0]).toEqual(expectedAction);
        })
        .catch(error => done(error));

      done();
    }
  );
});
