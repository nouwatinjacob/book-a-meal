import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  MyMeals,
  mapStateToProps
} from '../../../src/components/caterer/MyMeals.jsx';
import {
  allMealResponse,
} from '../../__mockData__/mockMeal';

const props = {
  deleteMealAction: () => Promise.resolve(),
  getMeals: () => Promise.resolve(),
  mealState: {
    allMealResponse,
    paginate: allMealResponse.paginate
  },
};

describe('MyMeals component', () => {
  localStorage.setItem('token', catererToken);
  const setup = () => shallow(<MyMeals {...props} />);

  it('should render MyMeals component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'handlePageClick'
  if pagination button is clicked`, (done) => {
    const wrapper = setup();

    const data = {
      selected: 1
    };

    const handlePageClickSpy = jest.spyOn(
      wrapper.instance(),
      'handlePageClick'
    );
    wrapper.instance().handlePageClick(data);
    expect(handlePageClickSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'handleDelete'
  if delete button is clicked`, (done) => {
    const wrapper = setup();

    const mealId = 1;
    window.location.reload = jest.fn();
    const handleDeleteSpy = jest.spyOn(
      wrapper.instance(),
      'handleDelete'
    );
    wrapper.instance().handleDelete(mealId);
    expect(handleDeleteSpy).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
    window.location.reload.mockRestore();

    done();
  });
});