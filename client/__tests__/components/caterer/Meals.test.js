import React from 'react';
import {
  shallow
} from 'enzyme';
import sweetalert from 'sweetalert';
import {
  Meals
} from '../../../src/components/caterer/Meals.jsx';
import {
  mealResponse
} from '../../__mockData__/mockMeal';

const props = {
  deleteAction: jest.fn(),
  meals: mealResponse.meal
};

jest.mock('sweetalert');

describe('Meals component', () => {
  localStorage.setItem('token', catererToken);
  const setup = () => shallow(<Meals {...props} />);

  it('should render Meals component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'handleDelete'
  when modify order button is clicked`, (done) => {
    const wrapper = setup();

    const handleDeleteSpy = jest.spyOn(
      wrapper.instance(),
      'handleDelete'
    );
    sweetalert.mockResolvedValue(Promise.resolve(true));
    wrapper.instance().handleDelete();
    expect(handleDeleteSpy).toHaveBeenCalled();

    done();
  });
});