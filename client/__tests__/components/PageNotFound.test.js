import React from 'react';
import {
  shallow
} from 'enzyme';
import PageNotFound from '../../src/components/PageNotfound.jsx';

describe('PageNotFound component', () => {
  const setup = () => shallow(<PageNotFound />);

  it('should render PageNotFound component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });
});