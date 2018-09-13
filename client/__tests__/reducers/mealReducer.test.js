import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as actionTypes from '../../src/constants/actionTypes';
import {
  allMealResponse,
  mealResponse,
  mealDetails,
  saveMealResponse
} from '../__mockData__/mockMeal';
import {
  addMeal,
  getMealSuccess,
  getMealUnsuccess,
  addMealSuccess,
  addMealUnsuccess,
  getAMealSuccess,
  getAMealUnsuccess,
  editMealSuccess,
  editMealUnsuccess,
  deleteMealSuccess,
  deleteMealUnsuccess
} from '../../src/actions/mealAction';
import mealReducer from '../../src/reducers/mealReducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

const initialState = {
  meals: {},
  meal: {},
  error: null,
  success: false,
  loading: false,
};

describe('Test mealReducer - GET', () => {
  it(`should update state with meals 
  when get meal request is successful`, () => {
    const action = getMealSuccess(allMealResponse);
    const newState = mealReducer(initialState, action);
    expect(newState.meals).toEqual(allMealResponse.meals);
    expect(newState.paginate).toEqual(allMealResponse.paginate);
  });

  it(`should update state with errors when get meal request fails`, () => {
    const action = getMealUnsuccess('Error messages');
    const newState = mealReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.loading).toEqual(false);
  });
});

describe('Test mealReducer -ADD', () => {
  it('should update state with meal when meal is added successfully', () => {
    const action = addMealSuccess(saveMealResponse);
    const newState = mealReducer(initialState, action);
    expect(newState.meal).toEqual(saveMealResponse.meal);
    expect(newState.meal.name).toBe(saveMealResponse.meal.name);
    expect(newState.meal.price).toBe(saveMealResponse.meal.price);
  });

  it(`should update state with errors when add meal request fails`, () => {
    const action = addMealUnsuccess('Error messages');
    const newState = mealReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.loading).toEqual(false);
  });
});

describe('Test mealReducer -GET A MEAL', () => {
  it('should update state when get a meal', () => {
    const action = getAMealSuccess(mealResponse);
    const newState = mealReducer(initialState, action);
    expect(newState.meal).toEqual(mealResponse.meal);
    expect(newState.success).toEqual(true);
  });

  it(`should update state with errors when get a meal request fails`, () => {
    const action = getAMealUnsuccess('Error messages');
    const newState = mealReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test mealReducer -DELETE', () => {
  it('should update state when meal delete', () => {
    const action = deleteMealSuccess(mealResponse.meal.id);
    const newInitialState = { meals: [mealResponse.meal] };
    const newState = mealReducer(newInitialState, action);
    expect(newState.meals.meals).toEqual([]);
    expect(newState.success).toEqual(true);
    expect(newState.loading).toEqual(false);
  });

  it(`should update state with errors when delete a meal request fails`, () => {
    const action = deleteMealUnsuccess('Error messages');
    const newState = mealReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test mealReducer -EDIT', () => {
  it('should update state when edit meal', () => {
    const action = editMealSuccess({ meal: mealResponse.meal });
    const newInitialState = { meals: { meals: [mealResponse.meal] } };
    const newState = mealReducer(newInitialState.meals, action);
    expect(newState.meals.meals[0].name).toEqual(mealResponse.meal.name);
    expect(newState.meal).toEqual(mealResponse.meal);
    expect(newState.success).toEqual(true);
    expect(newState.loading).toEqual(false);
  });

  it(`should update state with errors when edit meal request fails`, () => {
    const action = editMealUnsuccess('Error messages');
    const newState = mealReducer(initialState, action);
    expect(newState.error).toEqual('Error messages');
    expect(newState.success).toEqual(false);
  });
});

describe('Test mealReducer', () => {
  it('should update initial state if no action dispatch', () => {
    const newState = mealReducer(initialState, {});
    expect(newState).toEqual(initialState);
  });
});