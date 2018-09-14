import React from 'react';
import {
  shallow
} from 'enzyme';
import HomePage from '../../src/components/Homepage.jsx';

describe('HomePage component', () => {
  const setup = () => shallow(<HomePage />);

  it('should render HomePage component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });
});