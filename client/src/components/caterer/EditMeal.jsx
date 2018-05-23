import React from 'react';
import CatererHeader from '../partials/CatererHeader.jsx';
import mealValidation from '../../utils/mealValidation';
import Errors from '../partials/ValidationErrors.jsx';

/**
 * EditMeal class declaration
 *
 * @class EditMeal
 *
 * @extends {React.Component}
 */
class EditMeal extends React.Component {
  state = {
    mealData: {
      name: 'Fried Rice and chicken',
      price: 2500,
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
   const { mealData } = this.state;
   mealData[event.target.name] = event.target.value;
   this.setState({ mealData });
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
     this.setState({ errors: [] });
     console.log(this.state.mealData);
   } else {
     this.setState(state => ({ errors: validation.errors }));
     const { errors } = validation;
     console.log('>>>>>>>>> ', errors);
   }
 }

  /**
   * Renders EditMeal component
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
                <h3>Edit Meal Details</h3>
                <form onSubmit={this.onFormSubmit}>
                {this.state.errors && <Errors errors={this.state.errors}>Errors</Errors>}
                <input
                    type='text'
                    name='name'
                    placeholder='Meal Name'
                    value={this.state.mealData.name}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='text'
                    name='price'
                    placeholder='Meal Price'
                    value={this.state.mealData.price}
                    onChange={this.onInputChange}
                  /><br/>
                  <input
                    type='file'
                    name='image'
                    placeholder='Meal Image'
                    value={this.state.mealData.image}
                    onChange={this.onInputChange}
                  /><br/>
                  <button className='button warning'>Modify Meal</button>
                </form>
              </div>

            </div>

          </div>
      </div>
   );
 }
}

export default EditMeal;