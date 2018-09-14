import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  ConfirmOrder,
  mapStateToProps
} from '../../../src/components/customer/ConfirmOrder.jsx';
import {
  mealResponse
} from '../../__mockData__/mockMeal';

const props = {
  getAMealAction: jest.fn(),
  makeOrderAction: () => Promise.resolve(),
  mealState: {
    meal: mealResponse.meal
  },
  orderState: {
    order: {
      quantity: 3
    },
    error: {
      response: {
        data: {
          message: 'Error messages'
        }
      }
    }
  }
};

const ids = [1, 2, 3];

describe('ConfirmOrder component', () => {
  localStorage.setItem('token', customerToken);
  sessionStorage.setItem('ids', ids);
  const setup = () => shallow(<ConfirmOrder {...props} />);

  it('should render ConfirmOrder component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'handleQuantityChange'
  when quantity is changed`, (done) => {
    const wrapper = setup();

    const event = {
      currentTarget: {
        value: '5'
      },
      preventDefault: jest.fn()
    };

    const handleQuantityChangeSpy = jest.spyOn(
      wrapper.instance(),
      'handleQuantityChange'
    );
    wrapper.instance().handleQuantityChange(event);
    expect(handleQuantityChangeSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'handleMakeOrder'
  when confirm order button is clicked`, (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    };

    const handleMakeOrderSpy = jest.spyOn(
      wrapper.instance(),
      'handleMakeOrder'
    );
    wrapper.instance().handleMakeOrder(event);
    expect(handleMakeOrderSpy).toHaveBeenCalled();

    done();
  });
});