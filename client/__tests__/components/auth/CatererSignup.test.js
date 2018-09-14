import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  CatererSignup,
  mapStateToProps
} from '../../../src/components/auth/CatererSignup.jsx';

const props = {
  signupAction: () => Promise.resolve(),
  isLoading: true,
  errorResponse: {
    message: 'Error message'
  }
};

describe('CatererSignup component', () => {
  const setup = () => shallow(<CatererSignup {...props} />);

  it('should render CatererSignup component correctly', (done) => {
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
      catererData: {
        businessName: 'Stephen shop',
        ownerName: 'Stephen Aribaba',
        businessAddress: '12, lokoja street',
        email: 'caterer1@gmail.com',
        password: 'password',
        password_confirmation: 'password',
        userType: 'caterer'
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
          businessName: 'Stephen shop',
          ownerName: 'Stephen Aribaba',
          businessAddress: '12, lokoja street',
          email: 'caterer1@gmail.com',
          password: 'password',
          password_confirmation: 'password',
          userType: 'caterer'
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
