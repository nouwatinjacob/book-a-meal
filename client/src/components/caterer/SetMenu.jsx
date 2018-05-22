import React from 'react';
import Header from '../partials/Header.jsx';
import CatererHeader from '../partials/CatererHeader.jsx';

class SetMenu extends React.Component {
  render() {
    return (
      <div className='container'>

        <Header/>
        <CatererHeader/>
          <div className='wrapper'>
            <div className='login'>
              <div className='login-form'>
                <h3>Add New Menu</h3>
                <form>
                  <input type='date' id='my-input' /><br/>
                  <select name='meal'>
                    <option value='1'>Pick a Meal</option>
                    <option value='Fried Rice'>Fried Rice</option>
                    <option value='Egusi Soup and Eba'>Egusi Soup and Eba</option>
                    <option value='Yam and fried Egg'>Yam and fried Egg</option>
                    <option value='Ofada Rice'>Ofada Rice</option>
                  </select>
                  <button className='button delete' id='add-btn'>Add</button><br/>
                  <p className='error' style={{ color: 'red' }}></p>
                  <div id='myList'>
                    <p></p>
                  </div>
                  <button className='button warning' id='long-button'>Save</button>
                </form>
              </div>

            </div>

          </div>
      </div>
    );
  }
}

export default SetMenu;
