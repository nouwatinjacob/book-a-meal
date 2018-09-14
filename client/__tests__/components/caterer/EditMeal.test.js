import React from 'react';
import {
  shallow
} from 'enzyme';
import sweetalert from 'sweetalert';
import {
  EditMeal,
  mapStateToProps
} from '../../../src/components/caterer/EditMeal.jsx';

const props = {
  getAMealAction: jest.fn(),
  editMealAction: () => Promise.resolve(),
  mealState: {
    success: true,
    error: {
      response: {
        data: {
          message: 'Error Message'
        }
      }
    }
  },
  match: {
    params: {
      mealdId: 1
    }
  },
  isLoading: true
};

jest.mock('sweetalert');

describe('EditMeal component', () => {
  localStorage.setItem('token', catererToken);
  const setup = () => shallow(<EditMeal {...props} />);

  it('should render EditMeal component correctly', (done) => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();

    done();
  });

  it(`should call 'onFormSubmit'
  when edit meal button is clicked`, (done) => {
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
});