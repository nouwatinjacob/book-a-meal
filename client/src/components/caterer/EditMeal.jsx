import React from 'react';
import CatererHeader from '../partials/CatererHeader.jsx';

/**
 * EditMeal class declaration
 *
 * @class EditMeal
 *
 * @extends {React.Component}
 */
class EditMeal extends React.Component {

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
                <form>
                  <input type='text' placeholder='Meal Name' required/><br/>
                  <input type='text' placeholder='Meal Price' required/><br/>
                  <input type='file' placeholder='Meal Image' required/><br/>
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
