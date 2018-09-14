import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  UserOrder,
  mapStateToProps
} from '../../../src/components/customer/UserOrders.jsx';
import {
  userOrderResponse
} from '../../__mockData__/mockOrder';

const props = {
  getUserOrderAction: jest.fn(),
  cancelOrderAction: () => Promise.resolve(),
  isSuccessful: true,
  orderState: {
    orders: {
      userOrderResponse,
      paginate: userOrderResponse.paginate
    }
  }
};

const ids = [1, 2, 3];

describe('UserOrder component', () => {
  localStorage.setItem('token', customerToken);
  sessionStorage.setItem('ids', ids);
  const setup = () => shallow(<UserOrder {...props} />);

  it('should render ModifyOrder component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'handleModify'
  if modify order button if clicked`, (done) => {
    const wrapper = setup();

    const mealId = 1;
    const menuId = 1;
    const orderId = 1;

    const handleModifySpy = jest.spyOn(
      wrapper.instance(),
      'handleModify'
    );
    wrapper.instance().handleModify(mealId, menuId, orderId);
    expect(handleModifySpy).toHaveBeenCalled();
    done();
  });

  it(`should call 'handleCancelOrder'
  when modify order button is clicked`, (done) => {
    const wrapper = setup();

    const orderId = 1;

    const handleCancelOrderSpy = jest.spyOn(
      wrapper.instance(),
      'handleCancelOrder'
    );
    wrapper.instance().handleCancelOrder(orderId);
    expect(handleCancelOrderSpy).toHaveBeenCalled();

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