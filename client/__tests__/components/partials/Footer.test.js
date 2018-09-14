import React from 'react';
import {
  shallow
} from 'enzyme';
import Footer from '../../../src/components/partials/Footer.jsx';

describe('Footer component', () => {
  const setup = () => shallow(<Footer />);

  it('should render Footer component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });
});