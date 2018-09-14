import React from 'react';
import {
  shallow
} from 'enzyme';
import sweetalert from 'sweetalert';
import {
  AddMeal,
  mapStateToProps
} from '../../../src/components/caterer/AddMeal.jsx';

const props = {
  addMeal: () => Promise.resolve(),
  mealState: {},
  isLoading: true
};

jest.mock('sweetalert');

describe('AddMeal component', () => {
  localStorage.setItem('token', catererToken);
  const setup = () => shallow(<AddMeal {...props} />);

  it('should render AddMeal component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'onInputChange'
  when input value is changed`, (done) => {
    const wrapper = setup();

    const event = {
      target: {
        name: 'Fried Rice',
        files: ['Fried-rice.jpg']
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

  it(`should call 'onInputChange'
  when input value is changed`, (done) => {
    const wrapper = setup();

    const event = {
      target: {
        name: 'Fried Rice',
        files: ['Fried-rice.jpg']
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

  it(`should call 'onFormSubmit'
  when modify order button is clicked`, (done) => {
    const wrapper = setup();

    const event = {
      preventDefault: jest.fn()
    };

    wrapper.setState({
      mealData: {
        name: 'Fried Rice',
        price: 2600,
        image: 'fried-rice.jpg'
      }
    });

    const onFormSubmitSpy = jest.spyOn(
      wrapper.instance(),
      'onFormSubmit'
    );
    sweetalert.mockResolvedValue(Promise.resolve(true));
    wrapper.instance().onFormSubmit(event);
    expect(onFormSubmitSpy).toHaveBeenCalled();

    done();
  });
});
