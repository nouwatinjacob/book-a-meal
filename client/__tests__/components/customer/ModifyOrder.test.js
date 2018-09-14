import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  ModifyOrder,
  mapStateToProps
} from '../../../src/components/customer/ModifyOrder.jsx';
import {
  getAnOrderResponse
} from '../../__mockData__/mockOrder';

const props = {
  getAnOrderAction: jest.fn(),
  modifyOrderAction: () => Promise.resolve(),
  orderDetails: getAnOrderResponse.order,
  orderState: {
    success: true,
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

describe('ModifyOrder component with success set as true', () => {
  localStorage.setItem('token', customerToken);
  sessionStorage.setItem('ids', ids);
  const setup = () => shallow(<ModifyOrder {...props} />);

  it('should render ModifyOrder component correctly', (done) => {
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

  it(`should call 'handleSubmit'
  when modify order button is clicked`, (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    };

    const handleSubmitSpy = jest.spyOn(
      wrapper.instance(),
      'handleSubmit'
    );
    wrapper.instance().handleSubmit(event);
    expect(handleSubmitSpy).toHaveBeenCalled();

    done();
  });
});

describe('ModifyOrder component with success set as false', () => {
  const propss = {
    getAnOrderAction: jest.fn(),
    modifyOrderAction: () => Promise.resolve(),
    orderDetails: getAnOrderResponse.order,
    orderState: {
      success: false,
      error: {
        response: {
          data: {
            message: 'Error messages'
          }
        }
      }
    }
  };
  const setup = () => shallow(<ModifyOrder {...propss} />);

  it('should render ModifyOrder component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });
});
