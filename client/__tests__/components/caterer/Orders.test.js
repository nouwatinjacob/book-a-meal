import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  Orders,
  mapStateToProps
} from '../../../src/components/caterer/Orders.jsx';
import {
  catererOrderResponse
} from '../../__mockData__/mockOrder';

const props = {
  getAllCatererOrderAction: () => Promise.resolve(),
  orderState: {
    orderDetails: catererOrderResponse,
    paginate: catererOrderResponse.paginate
  }
};

describe('Orders component', () => {
  const setup = () => shallow(<Orders {...props} />);

  it('should render Orders component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });
});

describe('Orders component', () => {
  const propss = {
    getAllCatererOrderAction: () => Promise.resolve(),
    orderState: {
      orderDetails: catererOrderResponse.orders,
      paginate: catererOrderResponse.paginate
    }
  };

  const setup = () => shallow(<Orders {...propss} />);

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

  it(`should call 'handleDateChange'
  when date is changed`, (done) => {
    const wrapper = setup();

    const event = {
      target: {
        value: '2018-05-09'
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
});
