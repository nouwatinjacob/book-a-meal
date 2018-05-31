import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addMeal } from '../../actions/mealAction';
import CatererHeader from '../partials/CatererHeader.jsx';
import mealValidation from '../../utils/mealValidation';
import Errors from '../partials/ValidationErrors.jsx';

/**
 * AddMeal class declaration
 *
 * @class AddMeal
 *
 * @extends {React.Component}
 */
class AddMeal extends React.Component {
  state = {
    mealData: {
      name: '',
      price: '',
      image: ''
    },
    errors: []
  }

  /**
  * Handle onInputChange
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
 onInputChange = (event) => {
   const mealData = this.state.mealData;
   switch (event.target.name) {
     case 'image':
       mealData.image = event.target.files[0];
       break;
     default:
       mealData[event.target.name] = event.target.value;
   }
   this.setState(mealData);
 }

  /**
  * Handle onFormSubmit
  *
  * @param {event} event
  *
  * @return {event} event
  *
  */
 onFormSubmit = (event) => {
   event.preventDefault();
   const validation = mealValidation(this.state.mealData);
   if (validation.isValid()) {
     const { name, price, image } = this.state.mealData;
     const formData = new FormData();

     formData.append('name', name);
     formData.append('price', price);
     formData.append('image', image);
     this.props.addMeal(formData);
   } else {
     this.setState(state => ({ errors: validation.errors }));
     const { errors } = validation;
   }
 }

  /**
   * Renders Login component
   *
   * @returns {XML} XML/JSX
   */
 render() {
   return (
      <div className='container'>
        <CatererHeader/>
          <div className='wrapper'>
            <div className='login'>
              <div className='login-form'>
                <h3>Add New Meal</h3>
                <form encType='multipart/form-data' onSubmit={this.onFormSubmit}>
                {this.state.errors && <Errors errors={this.state.errors}>Errors</Errors>}
                  <input
                    type='text'
                    name='name'
                    placeholder='Meal Name'
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='text'
                    name='price'
                    placeholder='Meal Price'
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='file'
                    name='image'
                    accept='image/*'
                    placeholder='Meal Image'
                    onChange={this.onInputChange}
                  /><br/>
                  <button className='button warning'>Add Meal</button>
                </form>
              </div>

            </div>

          </div>
      </div>
   );
 }
}

AddMeal.propTypes = {
  addMeal: PropTypes.func.isRequired,
  mealState: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  mealState: state.mealReducer
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ addMeal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddMeal);
