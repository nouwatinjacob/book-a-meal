import React from 'react';
import CatererHeader from '../partials/CatererHeader.jsx';

/**
 * AddMeal class declaration
 *
 * @class AddMeal
 *
 * @extends {React.Component}
 */
class AddMeal extends React.Component {
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
                <form>
                  <input type='text' placeholder='Meal Name' required/><br/>
                  <input type='text' placeholder='Meal Price' required/><br/>
                  <input type='file' placeholder='Meal Image' required/><br/>
                  <button className='button warning'>Add Meal</button>
                </form>
              </div>

            </div>

          </div>
      </div>
    );
  }
}

export default AddMeal;
