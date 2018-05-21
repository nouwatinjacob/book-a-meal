import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../partials/Header.jsx';

/**
 * Login class declaration
 *
 * @class Homepage
 *
 * @extends {React.Component}
 */
class Login extends React.Component {
  render() {
    return (
      <div className='container'>
        <Header/>

        <div className='wrapper'>
          <div className='login'>
            <div className='login-form'>
              <h3>User Login</h3>
              <form>
                <input type='text' placeholder='Email' required/><br/>
                <input type='password' placeholder='Password' required/><br/>
                <button className='button warning'><a href='caterer.html'>Login</a></button>
                <p>Forgot <a href='#'>Password?</a></p>
              </form>
            </div>

          </div>

        </div>

    </div>
    );
  }
}

export default Login;
