import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  OrderDetail,
  mapStateToProps
} from '../../../src/components/caterer/OrderDetail.jsx';
import {
  getAnOrderResponse
} from '../../__mockData__/mockOrder';

const props = {
  getAnOrderAction: jest.fn(),
  orderState: {
    order: getAnOrderResponse
  },
  match: {
    params: {
      orderId: 1
    }
  }
};

describe('OrderDetail component', () => {
  localStorage.setItem('token', catererToken);
  const setup = () => shallow(<OrderDetail {...props} />);

  it('should render OrderDetail component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });
});
