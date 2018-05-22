import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';

/**
 * CustomerSignup class declaration
 *
 * @class CustomerSignup
 *
 * @extends {React.Component}
 */
class CustomerSignup extends React.Component {
  /**
    * Renders CustomerSignup component
    *
    * @returns {XML} XML/JSX
*/
  render() {
    return (
      <div className='container'>
        <Header/>
        <div className='wrapper'>
          <div className='login'>
            <div className='login-form'>
              <h3>User Registration</h3>
              <form>
                  <input type='text' placeholder='First Name' required/><br/>
                  <input type='text' placeholder='Last Name' required/><br/>
                  <input type='text' placeholder='Username' required/><br/>
                  <input type='email' placeholder='Email' required/><br/>
                  <input type='password' placeholder='Password' required/><br/>
                  <input type='password' placeholder='Confirm Password' required/><br/>
                <button className='button warning'>Signup</button>
                <p>
                  Do you want to be part of our Caterers?
                  <Link to='/caterer-signup'>Signup  here</Link>
                </p>
            </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerSignup;
