import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  Login,
  mapStateToProps
} from '../../../src/components/auth/Signin.jsx';

const props = {
  loginAction: () => Promise.resolve(),
  isLoading: true
};

describe('Signin component', () => {
  const setup = () => shallow(<Login {...props} />);

  it('should render Signin component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'onSubmit'
  when signin button is clicked`, (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    };

    wrapper.setState({
      loginData: {
        email: 'jaysansa@gmail.com',
        password: 'hghghghgh'
      }
    });

    const onSubmitSpy = jest.spyOn(
      wrapper.instance(),
      'onSubmit'
    );
    wrapper.instance().onSubmit(event);
    expect(onSubmitSpy).toHaveBeenCalled();

    done();
  });

  it(`should call 'onInputChange'
  when input value is changed`, (done) => {
    const wrapper = setup();

    const event = {
      target: {
        name: {
          email: 'jaysansa@gmail.com',
          password: 'hghghghgh'
        }
      }
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