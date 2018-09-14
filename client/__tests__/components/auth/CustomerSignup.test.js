import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  CustomerSignup,
  mapStateToProps
} from '../../../src/components/auth/CustomerSignup.jsx';

const props = {
  signupAction: () => Promise.resolve(),
  isLoading: true,
  errorResponse: {
    message: 'Error message'
  }
};

describe('CustomerSignup component', () => {
  const setup = () => shallow(<CustomerSignup {...props} />);

  it('should render CustomerSignup component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'onFormSubmit'
  when signup button is clicked`, (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    };

    wrapper.setState({
      customerData: {
        firstName: 'Jacob',
        lastName: 'Nouwatin',
        email: 'customer1@gmaill.com',
        password: 'password',
        password_confirmation: 'password',
        userType: 'customer'
      }
    });

    const onFormSubmitSpy = jest.spyOn(
      wrapper.instance(),
      'onFormSubmit'
    );
    wrapper.instance().onFormSubmit(event);
    expect(onFormSubmitSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'onInputChange'
  when input value is changed`, (done) => {
    const wrapper = setup();

    const event = {
      target: {
        name: {
          firstName: 'Jacob',
          lastName: 'Nouwatin',
          email: 'customer1@gmaill.com',
          password: 'password',
          password_confirmation: 'password',
          userType: 'customer'
        }
      },
      preventDefault: jest.fn()
    };

    const onInputChangeSpy = jest.spyOn(
      wrapper.instance(),
      'onInputChange'
    );
    wrapper.instance().onInputChange(event);
    expect(onInputChangeSpy).toHaveBeenCalled();

    done();
  });
});