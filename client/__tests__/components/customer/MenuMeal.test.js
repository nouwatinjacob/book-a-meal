import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  MenuMeal,
  mapStateToProps
} from '../../../src/components/customer/MenuMeal.jsx';
import {
  retrieveMenuResponse
} from '../../__mockData__/mockMenu';

const props = {
  getMenuAction: jest.fn(),
  menuState: {
    menus: retrieveMenuResponse
  }
};


describe('MenuMeals component', () => {
  localStorage.setItem('token', customerToken);
  const setup = () => shallow(<MenuMeal {...props} />);

  it('should render MenuMeals component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call checkYesterdayMenu when
  checking if meal is yesterday menu`, (done) => {
    const wrapper = setup();

    const checkYesterdayMenuSpy = jest.spyOn(
      wrapper.instance(),
      'checkYesterdayMenu'
    );
    wrapper.instance().checkYesterdayMenu();
    expect(checkYesterdayMenuSpy).toHaveBeenCalled();

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

  it(`should call 'onClickOrder'
  if order meal button if clicked`, (done) => {
    const wrapper = setup();

    const mealId = 1;
    const menuId = 1;
    const mealUserId = 1;
    const userId = 2;

    const onClickOrderSpy = jest.spyOn(
      wrapper.instance(),
      'onClickOrder'
    );
    wrapper.instance().onClickOrder(mealId, menuId, mealUserId, userId);
    expect(onClickOrderSpy).toHaveBeenCalled();
    done();
  });

  it(`should call 'handleDateChange'
  if date is change on the calendar`, (done) => {
    const wrapper = setup();

    const event = {
      target: {
        value: '5'
      }
    };

    const handleDateChangeSpy = jest.spyOn(
      wrapper.instance(),
      'handleDateChange'
    );
    wrapper.instance().handleDateChange(event);
    expect(handleDateChangeSpy).toHaveBeenCalled();

    done();
  });

  it(`should call componentWillUnmount if
   unmount component `, (done) => {
    const wrapper = setup();

    const componentWillUnmountSpy = jest.spyOn(
      wrapper.instance(),
      'componentWillUnmount'
    );
    wrapper.instance().componentWillUnmount();
    expect(componentWillUnmountSpy).toHaveBeenCalled();

    done();
  });
});