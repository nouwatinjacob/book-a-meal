import React from 'react';
import {
  shallow
} from 'enzyme';
import sweetalert from 'sweetalert';
import {
  SetMenu,
  mapStateToProps
} from '../../../src/components/caterer/SetMenu.jsx';
import {
  allMealResponse
} from '../../__mockData__/mockMeal';

const props = {
  getMeals: jest.fn(),
  setMenuAction: () => Promise.resolve(),
  mealState: {
    paginate: allMealResponse.paginate,
  }
};

jest.mock('sweetalert');

describe('SetMenu component', () => {
  const setup = () => shallow(<SetMenu {...props} />);

  it('should render SetMenu component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'onDateChange'
  when date is changed`, (done) => {
    const wrapper = setup();

    const event = {
      target: {
        value: '2018-05-09'
      }
    };

    const onDateChangeSpy = jest.spyOn(
      wrapper.instance(),
      'onDateChange'
    );
    wrapper.instance().onDateChange(event);
    expect(onDateChangeSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'onCheck'
  when date is changed`, (done) => {
    const wrapper = setup();

    const event = {
      target: {
        value: 1
      }
    };

    const onCheckSpy = jest.spyOn(
      wrapper.instance(),
      'onCheck'
    );
    wrapper.instance().onCheck(event);
    expect(onCheckSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'onFormSubmit'
  when modify order button is clicked`, (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    };

    wrapper.setState({
      menuData: {
        menuDate: '2018-12-09',
        mealId: [2, 3]
      }
    });

    const onFormSubmitSpy = jest.spyOn(
      wrapper.instance(),
      'onFormSubmit'
    );
    sweetalert.mockResolvedValue(Promise.resolve(true));
    wrapper.instance().onFormSubmit(event);
    expect(onFormSubmitSpy).toHaveBeenCalled();

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
});