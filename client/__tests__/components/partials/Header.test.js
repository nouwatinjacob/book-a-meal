import React from 'react';
import {
  shallow
} from 'enzyme';
import {
  Header,
  mapStateToProps
} from '../../../src/components/partials/Header.jsx';

const props = {
  logoutAction: () => Promise.resolve(),
  isLoggedIn: true,
  isSignedup: true
};

describe('Header component -loggedin is true', () => {
  localStorage.setItem('token', customerToken);
  const setup = () => shallow(<Header {...props} />);

  it('should render Header component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'handleLogout'
  when logout button is clicked`, (done) => {
    const wrapper = setup();

    const handleLogoutSpy = jest.spyOn(
      wrapper.instance(),
      'handleLogout'
    );
    wrapper.instance().handleLogout();
    expect(handleLogoutSpy).toHaveBeenCalled();

    done();
  });
});

describe('Header component -loggedin is false', () => {
  const propss = {
    logoutAction: () => Promise.resolve(),
    isLoggedIn: false,
    isSignedup: false
  };
  localStorage.setItem('token', customerToken);
  const setup = () => shallow(<Header {...propss} />);

  it(`should render Header component
   correctly when loggedin is false`, (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });
});