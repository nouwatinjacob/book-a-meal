import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';

class CatererSignup extends React.Component {
  render() {
    return (
      <div className='container'>
        <Header/>
        <div className='wrapper'>
          <div className='login'>
            <div className='login-form'>
              <h3>Caterer Registration</h3>
              <form>
                  <input type='text' placeholder='Business Name' required/><br/>
                  <input type='text' placeholder="Owner's Name" required/><br/>
                  <input type='text' placeholder='Business Address' required/><br/>
                  <input type='email' placeholder='Email' required/><br/>
                  <input type='password' placeholder='Password' required/><br/>
                  <input type='password' placeholder='Confirm Password' required/><br/>
                <button className='button warning'>Signup</button>

            </form>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default CatererSignup;
