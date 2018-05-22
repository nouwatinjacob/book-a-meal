import React from 'react';
import Header from '../partials/Header.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';

class AddMeal extends React.Component {
  render() {
    return (
      <div className='container'>

        <Header/>
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
